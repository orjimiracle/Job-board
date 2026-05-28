"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MoreHorizontal, Pencil, Trash2, Star, StarOff, Eye, Plus, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getJobs, updateJob, deleteJob as deleteJobFromDb } from "@/lib/db"
import type { Job } from "@/lib/types"
import { cn } from "@/lib/utils"
import { JobEditModal } from "@/components/admin/job-edit-modal"
import { supabase } from "@/lib/supabase" // Import the singleton supabase client

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("")
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal visibility
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null); // State for job being edited

  useEffect(() => {
    async function fetchJobsData() {
      const fetchedJobs = await getJobs();
      if (fetchedJobs) {
        setJobs(fetchedJobs);
      }
      setLoading(false);
    }
    fetchJobsData();

    // Set up real-time subscription
    const channel = supabase
      .channel('jobs_realtime_changes') // Unique channel name
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'jobs' },
        (payload) => {
          console.log('Change received!', payload);
          setJobs((prevJobs) => {
            if (payload.eventType === 'INSERT') {
              // Add new job to the list
              return [...prevJobs, payload.new as Job];
            }
            if (payload.eventType === 'UPDATE') {
              // Update existing job
              return prevJobs.map((job) =>
                job.id === payload.old.id ? { ...job, ...payload.new as Job } : job
              );
            }
            if (payload.eventType === 'DELETE') {
              // Remove deleted job
              return prevJobs.filter((job) => job.id !== payload.old.id);
            }
            return prevJobs;
          });
        }
      )
      .subscribe();

    // Clean up subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
  )

  const toggleFeatured = async (jobId: string) => {
    const jobToUpdate = jobs.find(job => job.id === jobId);
    if (jobToUpdate) {
      const updated = await updateJob(jobId, { featured: !jobToUpdate.featured });
      if (updated) {
        // State will be updated by real-time listener, no need to manually update here
      } else {
        console.error("Failed to toggle featured status.");
      }
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    const success = await deleteJobFromDb(jobId);
    if (success) {
      // State will be updated by real-time listener, no need to manually update here
      setDeleteJobId(null);
    } else {
      console.error("Failed to delete job.");
    }
  };

  const handleEditJob = (job: Job) => {
    setJobToEdit(job);
    setIsEditModalOpen(true);
  };

  const handleJobUpdated = (updatedJob: Job) => {
    // State will be updated by real-time listener, no need to manually update here
  };
  const typeColors: Record<string, string> = {
    Remote: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    "Full-time": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    "Part-time": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Internship: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
    Contract: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  }

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex justify-center items-center min-h-[50vh]">
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manage Jobs</h1>
          <p className="text-muted-foreground">
            View, edit, and manage all job listings.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/create" className="gap-2">
            <Plus className="size-4" />
            Create Job
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>All Jobs</CardTitle>
              <CardDescription>{filteredJobs.length} total jobs</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Posted</TableHead>
                  <TableHead className="text-center">Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No jobs found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-muted-foreground">{job.company} - {job.location}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{job.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="secondary" className={cn(typeColors[job.type])}>
                          {job.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {new Date(job.postedat).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleFeatured(job.id)}
                          className={cn(
                            job.featured && "text-amber-500 hover:text-amber-600"
                          )}
                        >
                          {job.featured ? (
                            <Star className="size-4 fill-current" />
                          ) : (
                            <StarOff className="size-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/jobs/${job.id}`} className="flex items-center gap-2">
                                <Eye className="size-4" />
                                View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="flex items-center gap-2"
                                onClick={() => handleEditJob(job)}
                            >
                              <Pencil className="size-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="flex items-center gap-2 text-destructive focus:text-destructive"
                              onClick={() => setDeleteJobId(job.id)}
                            >
                              <Trash2 className="size-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteJobId && handleDeleteJob(deleteJobId)}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {jobToEdit && (
        <JobEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          job={jobToEdit}
          onJobUpdated={handleJobUpdated}
        />
      )}
    </div>
  )
}
