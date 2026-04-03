import type {StructureResolver} from 'sanity/structure'
import { FaAd, FaArchive, FaBook, FaChartLine, FaEnvelope, FaHome, FaInfoCircle, FaList, FaPhone} from "react-icons/fa";
import { FaHandHolding } from "react-icons/fa";

const HIDDEN_TYPES = [
  'serviceItem',
  'serviceSubCategory',
  'service',
  'serviceCategory',
  'stat',
  'valueItem',
  'processItem',
  'aboutValues',
  'monthlySpecialItem',
  'aboutMorePage',
  'newServicePage',
]
type SingletonConfig = [string, React.ComponentType, string]
const SINGLETON_TYPES: SingletonConfig[] = [
  ['allServices', FaHandHolding, 'All Services'],
  ['statsContainer', FaChartLine, 'Stats Container'],
  ['infoSection', FaInfoCircle, 'Info Section'],
  ['contact', FaEnvelope, 'Contact'], 
  ['bookButton', FaBook, 'Book Button'],
  ['callButton', FaPhone, 'Call Button'],
  ['valueItemContainer', FaList, 'Value Item Container'],
  ['processCont', FaList, 'Category Page Processes'],
  ['about', FaArchive, 'About Page'],
  ['monthlyAd', FaAd, 'Monthly Ad'],
  ['aboutMore', FaInfoCircle, 'About More'],
  ['newServices', FaHandHolding, 'New Services'],
  // ['homePage', FaHome],
  // ['servicesPage', FaHandHolding], 
  // ['aboutPage', InfoFilledIcon], 
  // ['packagesPage', StarFilledIcon]
]
// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>{

  const allItems = S.documentTypeListItems()
  const visibleItems = allItems.filter((listItem) => {
    const id = listItem.getId()
    return !id || !HIDDEN_TYPES.includes(id)
  })

  const transformedItems = visibleItems.map((listItem) => {
    const id = listItem.getId()
    if (id) {
      // Check if this is a singleton type
      const singletonConfig = SINGLETON_TYPES.find(([typeId]) => typeId === id)
      
      if (singletonConfig) {
        const typeId = singletonConfig[0] // Document type ID from index 0
        const icon = singletonConfig[1] // Icon component from index 1
        const title = singletonConfig[2] as string // Title from index 2
        // Show singleton as a single document item instead of a list
        // This ensures only one document can exist and it's directly accessible
        return S.listItem()
          .title(title)
          .id(typeId)
          .icon(icon)
          .child(
            S.document()
              .schemaType(typeId)
              .documentId(typeId)
              .title(title)
              .views([
                S.view.form(),
              ])
          )
      }
    }
    return listItem
  })
  return S.list().title('Content').items(transformedItems)
}