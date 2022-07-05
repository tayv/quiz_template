import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import {FC} from 'react'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/WrapperInput'
import { Input } from '@components/atoms/input'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Quiz Template", 
    path: "/",
    currentPg: true,
  }
]

const QuizTemplate: FC = () => {

  // React hook form
  const { handleSubmit, control} = useForm()

  // Sample onSubmit form handler
  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted. Data:", data, "Submit form - errors", Error)
  })

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Quiz Template" size="h1" type="primary"/>
      <Paragraph text="This is a template to test form layout and start building out state and database behavior." size="standard" type="primary" />
      <br />
      <hr />
      
      <form className="border border-gray-900 py-2 px-4" onSubmit={onSubmit}>
        <Heading text="Test Form 1" size="h2" type="primary"/>
        <Paragraph text="This section is used to test a text input using a RHF controlled input." size="standard" type="primary" />
        <Heading text="Standard Uncontrolled Text Input" size="h3" type="primary"/>
        <Input name="uncontrolledInput" label="This is a label" />
        <Heading text="Controlled Wrapper Input" size="h3" type="primary"/>
        <WrapperInput
          name="controlledInput"
          label="This is a label"
          type="text"
          control={control}
          rules={{ required: "You must enter something" }}
          defaultValue=""
        />
        <br />
        <br />
        <button className="block border-gray-900 bg-gray-300 border px-2 py-1" type="submit">Test Submit</button>
      </form>

    </LayoutContainerSide>
  </>
  )
}
export default QuizTemplate