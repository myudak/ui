"use client"

import * as React from "react"

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/registry/manner/ui/pagination"

export default function PaginationDemo() {
  const [page, setPage] = React.useState(2)
  const total = 5
  const go = (next: number) => (event: React.MouseEvent) => {
    event.preventDefault()
    setPage(Math.min(total, Math.max(1, next)))
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" onClick={go(page - 1)} aria-disabled={page === 1} /></PaginationItem>
        {[1, 2, 3].map((item) => (
          <PaginationItem key={item}>
            <PaginationLink href="#" isActive={page === item} onClick={go(item)}>{item}</PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive={page === total} onClick={go(total)}>{total}</PaginationLink></PaginationItem>
        <PaginationItem><PaginationNext href="#" onClick={go(page + 1)} aria-disabled={page === total} /></PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
