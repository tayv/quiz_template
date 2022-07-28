import React, { FC } from 'react'
import { useWatch, Control } from 'react-hook-form'

export type HelpMessageProps = {
  inputName: string
  messageType: "warn" | "info" | null
  testFor: string | number 
  message: string | number
  regexFormula?: RegExp | undefined
  control: Control | undefined // Required by rhf Controller: https://react-hook-form.com/ts/#Control. Will be undefined if input field empty
}

export type TestForX = (testFor: string | number, regexFormula: RegExp) => HelpMessageProps| RegExp | null 


export const HelpMessage: FC<HelpMessageProps> = (
  {
    inputName,
    messageType,
    testFor,
    message,
    regexFormula,
    control,
    ...props
  }
) => {

  // Set up react hook form's Watch so we can get user's onChange input value. See: https://www.react-hook-form.com/api/usewatch
  const testWatch = useWatch({
    control,
    name: inputName,
    defaultValue: " ", // MUST HAVE A DEFAULT VALUE or testWatch.match(regEx) will fail
  })

  // Set the regex formula to use as a rendering gatekeeper
  const testForX: TestForX = (testFor, regexFormula) => {
    switch (testFor) {
      case "a":
        return  /(a)/g

      case "b":
        return /(b)/g

      case "custom":
        return regexFormula
        
      default:
        return null
    }
  }

  // This variable holds the final regex that .match() will use as gatekeeper for renderMessageStyl() 
  let regEx = testForX(testFor, regexFormula = /(b)/g)

  // Message style logic
  const renderMessageStyle = (messageType: HelpMessageProps, message: HelpMessageProps) => {
    switch (messageType) {
      case "warn":
        return <span className="text-sm font-bold text-amber-600 pt-4 pb-2">⚠️ This is a warning message for what you wrote in the input field: {message}</span> 
        
      case "info":
        return <span className="text-sm text-slate-500 pt-4 pb-2">🤓 This is a neutral informational message based on what you wrote in the input field: {message}</span> 
        
      default:
        return null
    }
  }

  return (
    <>
      {testWatch.match(regEx) && renderMessageStyle(messageType, message)} {/* MUST use .match() instead of regEx.test() */ }
    </>
 
  )
}    

export default HelpMessage

// NOTES
  // IMPORTANT: Use String.prototype.match instead of RegExp.prototype.test for logical gatekeeper or it will break when passing regFormula as a prop
    // See: 
      // https://stackoverflow.com/questions/73028753/why-do-these-seemingly-similar-props-result-in-different-behavior 
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match 

  // Usage notes:
    // If you need to show multiple help messages for a single input then stack the component/message in the form. This will be optmized post-mvp.

  // Other resources:
    // Input changes are done using useWatch from rhf. See: https://www.react-hook-form.com/api/usewatch 