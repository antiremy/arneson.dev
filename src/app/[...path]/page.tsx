import { Client } from '../client'

import '../../index.css'
 
export function generateStaticParams() {
  return [{ slug: [''] }]
}

// This is necessary so we can go to links without actually needing to create paths
export default function Page() {
  return <Client />
}