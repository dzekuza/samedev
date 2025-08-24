import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET () {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'published')
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching projects:', error)
      return NextResponse.json(
        { error: 'Failed to fetch projects' },
        { status: 500 }
      )
    }

    return NextResponse.json({ projects: data || [] })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
