"use client";

export function Pagination({ page, total, onPageChange }: { page: number; total: number; onPageChange: (page: number) => void }) {
  return <nav className="manner-pagination" aria-label="Pagination"><button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>← <span>Previous</span></button><div>{Array.from({ length: total }, (_, index) => index + 1).map((item) => <button key={item} aria-current={item === page ? "page" : undefined} onClick={() => onPageChange(item)}>{item}</button>)}</div><button disabled={page >= total} onClick={() => onPageChange(page + 1)}><span>Next</span> →</button></nav>;
}
