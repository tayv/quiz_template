import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/atoms/Heading'
import Paragraph from '@designSystem/atoms/Paragraph'
import { FC } from 'react'
import SectionCard from '@designSystem/molecules/SectionCard'
import Checkbox from 'designSystem/atoms/Checkbox'
import Divider from '@designSystem/atoms/Divider'


// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Checkbox", 
    path: "/",
    currentPg: true,
  }
]

const CheckboxArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Checkboxes</Heading>
      <Paragraph>On this page you'll find checkbox components.</Paragraph>

      <SectionCard id="header" style="standard">
        <Heading size="h3">Checkbox</Heading>
          <Paragraph>This is a standard checkbox. It's used for binary choices.</Paragraph>
          <Divider padding="xl" />

          <Heading size="h4" type="secondary">Example:</Heading>
          <Checkbox 
            id="checkboxInput" 
            style="standard" 
            label="This is a checkbox label" 
          />
      </SectionCard>

      <SectionCard id="header" style="standard">
        <Heading size="h3">Checkbox List</Heading>
          <Paragraph>This is a list of checkboxes. It's used for multi-select choices.</Paragraph>
          <Divider padding="xl" />
          <Heading size="h4" type="secondary">Example: WIP</Heading>
          
      </SectionCard>

    </LayoutContainerSide>

  </>
  )
}
export default CheckboxArticle