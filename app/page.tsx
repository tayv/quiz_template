import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import HelloWorld from "./hello.mdx"
import CardSection from "@components/ui/Card"
import ButtonCTA from "@components/form/ButtonCTA"
import LayoutContainer from "@components/ui/LayoutContainer"
import { Armchair } from "lucide-react"

export default function Home() {
  return (
    <>
      <Heading size="h1" weight="bold" padding="standard">
        Welcome to [Name] 👋
      </Heading>
      <Paragraph>
        Pick a product to get started for free.
        <em>No credit card required.</em>
      </Paragraph>

      <CardSection id="introProduct" className="" color="white">
        <LayoutContainer variant="flex" direction="row" padding="none">
          <div className="p-4 mr-4 flex items-center">
            <Armchair className="w-[60] h-[60]" />
          </div>
          <div className="py-2">
            <Heading size="h3">Featured Product</Heading>
            <Paragraph>A short description of the product goes here.</Paragraph>
            <ButtonCTA size="small" type="button" buttonText="Create Product" />
          </div>
        </LayoutContainer>
      </CardSection>

      <Heading size="h2" padding="standard">
        How it works
      </Heading>
      <Paragraph>
        Some info about the company and how it works. Here’s some more
        information about how to create a document or use a product.
      </Paragraph>
    </>
  )
}
