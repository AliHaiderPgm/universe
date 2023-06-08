import icons from '../components/constants/icons'
export const featuredBrands = [
  icons.adidas,
  icons.zara,
  icons.fendi,
  icons.nike
]
export const CATEGORIES = [
  {
    title: "Men",
    image: require('../assets/male_model_category.jpg'),
    categoryTypes: [
      { id: 1, name: 'All' },
      { id: 2, name: 'Shirts' },
      { id: 3, name: 'Jeans' },
      { id: 4, name: 'T-shirts' },
      { id: 5, name: 'Underwear' },
      { id: 6, name: 'Suit' },
      { id: 7, name: 'Jackets' },
      { id: 8, name: 'Belt' },
      { id: 9, name: 'Polo shirt' },
      { id: 10, name: 'Coat' },
      { id: 11, name: 'Sneakers' },
    ],
  },
  {
    title: "Child",
    image: require('../assets/child_model_category.jpg'),
    categoryTypes: [
      { id: 1, name: 'All' },
      { id: 2, name: 'Shirts' },
      { id: 3, name: 'Jeans' },
      { id: 4, name: 'T-shirts' },
      { id: 5, name: 'Trouser' },
      { id: 6, name: 'Kurta' },
      { id: 7, name: 'Hijab' },
      { id: 8, name: 'Salwar kameez' },
    ],
  },
  {
    title: "Women",
    image: require('../assets/female_model_category.jpg'),
    categoryTypes: [
      { id: 1, name: 'All' },
      { id: 2, name: 'Dress' },
      { id: 3, name: 'Kurta' },
      { id: 4, name: 'Hijab' },
      { id: 5, name: 'Salwar kameez' },
      { id: 6, name: 'Burka' },
      { id: 7, name: 'Abaya gowns' },
      { id: 8, name: 'Sneakers' },
    ],
  },
  {
    title: "Brands",
    icon: "star",
    path: "brands",
  },
]
export const SETTING_OPTIONS = [
  {
    icon: "goldProfile",
    title: "Profile",
    path: "updateProfile"
  },
  {
    icon: "bell",
    title: "Notification",
    path: 'openNotification'
  },
  {
    icon: "shoppingBag",
    title: "My Orders",
    path: "orderHistory"
  },
  {
    icon: "ruler",
    title: "Size Guide",
    path: "sizeGuide"
  },
  {
    icon: "heart",
    title: "Whislist",
    path: "wishList",
  },
  {
    icon: "setting",
    title: "Settings",
    path: 'openSetting'
  },
]
export const SORT = ["Recommended", "Price Low to High", "Price High to Low", "New Arrival", "Top Rated"]
