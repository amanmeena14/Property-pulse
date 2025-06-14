import React from 'react'
import InfoBox from './InfoBox'
import { text } from 'stream/consumers'

const InfoBoxes = () => {
  return (
    <section>
    <div className="container-xl lg:container m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        
        <InfoBox
        heading='For Renters'
        backgroundColor="bg-grey-100"
        buttonInfo={{
          text: 'browse properties',
          link: '/properties',
          backgroundColor: 'bg-black'
        }}>
          Find your dream rental property. Bookmark properties and contact owners.
        </InfoBox>
        <InfoBox
        heading='For Property Owners'
        backgroundColor="bg-blue-100"
        buttonInfo={{
          text: 'Add property',
          link: '/add-property',
          backgroundColor: 'bg-blue-500'
        }}>
          List your properties and reach potential tenants. Rent as an
          airbnb or long term.
        </InfoBox>
      </div>
    </div>
  </section>

  )
}

export default InfoBoxes