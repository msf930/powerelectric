import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './serviceType'
import { serviceItemType } from './serviceItemType'
import { serviceSubCategoryType } from './serviceSubCategory'
import { serviceCategoryType } from './serviceCategory'
import { allServicesType } from './allServices'
import { statType } from './stat'
import { statsContainerType } from './statsContainer'
import { infoSectionType } from './infoSection'
import { contactType } from './contact'
import { locationsType } from './locations'
import { bookButtonType } from './bookButton'
import { callButtonType } from './callBtn'
import { valueItemType } from './valueItem'
import { valueItemContainerType } from './valueItemContainer'
import { processItemType } from './processItem'
import { processContType } from './processCont'
import { aboutType } from './about'
import { aboutValuesType } from './aboutValues'
import { monthlyAdType } from './monthlyAd'
import { monthlySpecialItemType } from './monthlySpecialItem'
import { aboutMorePageType } from './aboutMorePage'
import { aboutMoreType } from './aboutMore'
import { blogPostType } from './blogPostType'
import { newServicesType } from './newServices'
import { newServicePageType } from './newServicePage'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    serviceType, 
    serviceItemType, 
    serviceCategoryType, 
    serviceSubCategoryType,
    allServicesType,
    statType,
    statsContainerType,
    infoSectionType,
    contactType,
    locationsType,
    bookButtonType,
    callButtonType,
    valueItemType,
    valueItemContainerType,
    processItemType,
    processContType,
    aboutType,
    aboutValuesType,
    monthlyAdType,
    monthlySpecialItemType,
    aboutMoreType,
    aboutMorePageType,  
    blogPostType,
    newServicesType,
    newServicePageType,
  ],
}
