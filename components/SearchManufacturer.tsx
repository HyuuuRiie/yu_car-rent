"use client"

import { useState, Fragment } from "react";
import Image from 'next/image'
import { Combobox, Transition } from '@headlessui/react'
import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from '@/types'

const SearchManufacturer = ({ selected, setSelected }: SearchManufacturerProps) => {
  const [query, setQuery] = useState('')

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) => (
        item.toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      ))

  return (
    <div className='search-manufacturer'>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top[14px]">
            <Image
              src="car-logo.svg"
              width={30}
              height={30}
              className="ml-3 mt-2 mb-2"
              alt="Car Logo"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder='Volkswagen'
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}   ///e = event
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {
                filteredManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) => `
                      relative search-manufacturer__option
                      ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                    `}
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                          {item}
                        </span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}
                          >
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                )
                )}
            </Combobox.Options>

          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer