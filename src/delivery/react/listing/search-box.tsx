import React, { useRef } from 'react'
import type { FormEvent } from 'react'
import './search-box.css'

interface Props {
  onSearch: (term: string) => void
}

export const SearchBox: React.FC<Props> = ({ onSearch }: Props) => {
  const input = useRef<HTMLInputElement>(null)
  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    onSearch(input?.current?.value ?? '')
  }

  return <form onSubmit={submitHandler} className="search">
    <input className="search-field" type="text" ref={input} aria-label="search"/>
    <input className="search-submit" type="submit" value="Search"/>
  </form>
}
