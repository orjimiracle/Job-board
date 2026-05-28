// lib/db.js
import { getSupabase } from './supabase';

export async function getJobs() {
  const { data, error } = await getSupabase().from('jobs').select('*');
  if (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
  return data;
}

export async function getJobById(id) {
  const { data, error } = await getSupabase()
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error('Error fetching job by ID:', error);
    return null;
  }
  return data;
}

export async function createJob(job) {
  const { data, error } = await getSupabase().from('jobs').insert([job]).select();
  if (error) {
    console.error('Error creating job:', error);
    return null;
  }
  return data[0];
}

export async function updateJob(id, updates) {
  const { data, error } = await getSupabase()
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select();
  if (error) {
    console.error('Error updating job:', error);
    return null;
  }
  return data[0];
}

export async function deleteJob(id) {
  const { error } = await getSupabase().from('jobs').delete().eq('id', id);
  if (error) {
    console.error('Error deleting job:', error);
    return false;
  }
  return true;
}