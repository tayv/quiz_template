"use client"

import * as z from "zod"

import { PageContextType } from "@template/templateTypes"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import FormTest2 from "@formControl/FormTest2"
import Field from "@formControl/Field"
import Checkbox from "@components/form/Checkbox"
import Input from "@components/form/Input"
import CardSection from "@components/ui/CardSection"
import { useState, createContext } from "react"
import RadioGroup from "@components/form/RadioGroup"
import Select from "@components/form/Select"
import product1SchemaTest from "./product1SchemaTestRefactor"
import { PageContext } from "@template/context"
import ModalStandard from "@components/ui/ModalStandard"
import ModalViewDoc from "@components/ui/ModalViewDoc"
import { PDFViewer, StyleSheet } from "@react-pdf/renderer"
import dynamic from "next/dynamic"
import MyDocument from "../product2/MyDocument"

import buildFinalDoc from "./product1SchemaTestRefactor"
import TestPDFDoc from "./TestPDFDoc"

// Create PDF styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#E4E4E4",
  },
})

const Product3 = () => {
  // Dynamically import PDFViewer to fix build bug since Next uses SSR
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  )

  const defaultValues = {
    checkboxExample: true,
    radioExample: "option1",
    textExample: "",
    jurisdiction: "location1",
  }

  const zodSchema = z.object({
    checkboxExample: z.boolean().optional(),
    radioExample: z.enum(["option1", "option2", "option3"]).optional(),
    textExample: z.string().optional(),
    jurisdiction: z.enum(["location1", "location2", "location3"]).optional(),
  })

  // Setup initial state
  const [formData, setFormData] = useState({})

  // Setup pg context values to pass to template
  const pageContextValue = {
    formData: formData,
    schema: product1SchemaTest,
  }

  // TEST initial PDF doc state
  const [finalDoc, setFinalDoc] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false) // ONLY RENDER IF FORM IS SUBMITTED

  // Sample onSubmit form handler
  // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads
  // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = async (data: any, event: any) => {
    setFormData(data) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
    console.log("event:", event)
    const body = data

    // test buildFinalDoc -------------------------
    // const finalDoc = await buildFinalDoc(data)
    // setFinalDoc(finalDoc)
    // console.log("finalDoc", finalDoc)
    setIsSubmitted(true)
    // --------------------------------------------

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (response.status !== 200) {
        console.log("something went wrong oops")
        //set an error banner here
      } else {
        // resetForm();
        console.log("form submitted successfully !!!")
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
    } catch (error) {
      console.log("there was an error submitting", error)
    }
  }

  return (
    <PageContext.Provider value={pageContextValue}>
      <Heading size="h1" weight="bold" padding="none">
        Product 3
      </Heading>
      <Paragraph>Testing refactored schema.</Paragraph>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-1400">
        <FormTest2
          id="product1Form"
          defaultValues={defaultValues}
          zodSchema={zodSchema}
          onSubmit={onSubmit}
          buttonLabel="Submit Form"
          productName="product1"
        >
          {isSubmitted && (
            <PDFViewer style={styles.page}>
              <TestPDFDoc formData={formData} />
            </PDFViewer>
          )}

          <Field name="jurisdiction" validateOnBlur={false}>
            <Field.GroupLabel>Location Select:</Field.GroupLabel>
            <Field.Tip>
              The template and template content can be customized by location.
            </Field.Tip>
            <Field.Control>
              <Select
                placeholder="Select an option"
                itemOptions={[
                  {
                    value: "location1",
                    labelText: "Location 1",
                    separator: false,
                  },
                  {
                    value: "location2",
                    labelText: "Location 2",
                    separator: false,
                  },
                  {
                    value: "location3",
                    labelText: "Location 3",
                    separator: false,
                  },
                ]}
              />
            </Field.Control>
          </Field>

          <Field
            name="checkboxExample"
            //validateOnBlur={false}
          >
            <Field.GroupLabel>Standard checkbox:</Field.GroupLabel>
            <Field.Control>
              <Checkbox>This is a label</Checkbox>
            </Field.Control>
          </Field>

          <Field
            name="radioExample"
            //validateOnBlur={false}
          >
            <Field.GroupLabel>Standard radio:</Field.GroupLabel>
            <Field.Control>
              <RadioGroup
                variant="button"
                options={[
                  { value: "option1", label: "Option 1" },
                  { value: "option2", label: "Option 2" },
                  { value: "option3", label: "Option 3" },
                ]}
              />
            </Field.Control>
          </Field>

          <Field
            name="textExample"
            //validateOnBlur={false}
          >
            <Field.GroupLabel>Standard text input:</Field.GroupLabel>
            <Field.Control>
              <Input type="text" />
            </Field.Control>
          </Field>
        </FormTest2>
      </div>
    </PageContext.Provider>
  )
}

export default Product3

// Need a useEffect for loading correct template. Want it to load dynamic values on first load based on location answer which should default based on estimated location.
// Need a way to hide/show premium content based on license and auth state