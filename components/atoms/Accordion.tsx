import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'
import * as AccordionRadix from '@radix-ui/react-accordion'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'

type AccordionProps = {
  items: AccordionItems[]
  typeRadix?: "single" | "multiple"
  defaultValue?: string | string[] | undefined
  collapsible?: boolean
  className?: string
}

// Tried using an enum for typeRadix instead of union type, but it didn't work either
enum AccordionType {
  "single",
  "multiple"
}

type AccordionItems = {
  value: string
  headerText: string
  contentText: string
}

const renderAccordionItems = (accordionItems: AccordionItems[]) => {

  return accordionItems.map((item: {value: string, headerText: string, contentText: string}) => (
    
      <AccordionRadix.Item value={item.value} className="mt-1">
      <AccordionRadix.Header className="group flex shadow bg-neutral-300 data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg">
      
        <AccordionRadix.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left">
          {item.headerText}
          <PlusIcon className="group-data-[state=open]:hidden h-4 w-4 text-neutral-500 " />
          <MinusIcon className="group-data-[state=closed]:hidden h-4 w-4 text-neutral-500 " />
        </AccordionRadix.Trigger>
        </AccordionRadix.Header>
      
        <AccordionRadix.Content className="data-[state=closed]:w-60 data-[state=open]:w-full bg-neutral-200 px-3 py-2 rounded-br-lg rounded-bl-lg">
          {item.contentText}
        </AccordionRadix.Content>
      </AccordionRadix.Item>
    
  ))
}

const Accordion:FC<AccordionProps> = ({
  items,
  typeRadix = "single",
  defaultValue,
  collapsible = false,
  className = "",
}) => (
  <AccordionRadix.Root
    type={typeRadix}
    defaultValue={defaultValue}
    collapsible={collapsible}
    className={ 
      classNames([
        "flex flex-col shrink rounded-md", // standard css styles go here. 
      //  accordionStyleMap[style], 
      ]) }
  >
    
    { renderAccordionItems(items) }
    
  </AccordionRadix.Root>

 )

export default Accordion


// NOTES
  // Radix documentation: https://www.radix-ui.com/docs/primitives/components/accordion
  // Use data-[state=closed] or data-[state=open] to target open/closed states. For example: data-[state=closed]:w-48 data-[state=open]:w-full


