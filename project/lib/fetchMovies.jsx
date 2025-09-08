import { supabase } from '@/lib/supabase'
import { getPublicUrl } from '@/lib/getPublicUrl'

export async function fetchMoviesTop10DubbedNewMovies() {
  const [
    { data: moviesData, error: moviesError },
    { data: top10Data, error: top10Error },
    { data: dubbedData, error: dubbedError },
    { data: newMoviesData, error: newMoviesError },
  ] = await Promise.all([
    supabase.from('movies').select('*').order('id', { ascending: false }).limit(50),
    supabase.from('Top10').select('*').order('id', { ascending: false }),
    supabase.from('dubbed').select('*').order('id', { ascending: false }),
    supabase.from('NewMovies').select('*').order('id', { ascending: false }),
  ])

  if (moviesError) throw moviesError
  if (top10Error) throw top10Error
  if (dubbedError) throw dubbedError
  if (newMoviesError) throw newMoviesError

  const moviesWithUrls = moviesData.map(m => ({
    ...m,
    posterUrl: getPublicUrl(m.poster_path),
    videoUrl: getPublicUrl(m.video_url || m.video_path),
  }))

  const top10WithUrls = top10Data.map(m => ({
    ...m,
    posterUrl: getPublicUrl(m.poster_path, 'Top10'),
    videoUrl: getPublicUrl(m.video_url, 'Top10'),
  }))

  const dubbedWithUrls = dubbedData.map(m => ({
    ...m,
    posterUrl: getPublicUrl(m.poster_path, 'dubbed'),
    videoUrl: getPublicUrl(m.video_url, 'dubbed'),
  }))

  const newMoviesWithUrls = newMoviesData.map(m => ({
    ...m,
    posterUrl: getPublicUrl(m.poster_path, 'NewMovies'),
    videoUrl: getPublicUrl(m.video_url, 'NewMovies'),
  }))

  return { moviesWithUrls, top10WithUrls, dubbedWithUrls, newMoviesWithUrls }
}
