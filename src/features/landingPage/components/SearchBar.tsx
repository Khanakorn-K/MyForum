'use client'
import { Input } from '@/components/ui/Input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SearchBar = () => {
    const searchParams = useSearchParams()
    const { replace } = useRouter()
    const pathname = usePathname()

    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('search')?.toString() || '')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams)

            if (searchTerm) {
                params.set('search', searchTerm)
            } else {
                params.delete('search')
            }

            replace(`${pathname}?${params.toString()}`)
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [searchTerm, pathname, replace, searchParams])
    return (
        <Input className="w-1/2" placeholder="Search..." defaultValue={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    )
}

export default SearchBar