import { Client } from './client'

import '../index.css'
 
export function generateStaticParams() {
  return [{ slug: [''] }]
}

export default function Page() {
  return <Client />
}