export type ColumnsDefTypes = {
  id: number
  label: string
  name: string
  sortable: boolean
}
export const MobileColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'pools',
    sortable: true,
    label: '',
  },
  {
    id: 2,
    name: 'earned',
    sortable: true,
    label: 'Recent Buffet profit',
  },
  {
    id: 4,
    name: 'details',
    sortable: true,
    label: 'APY',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: 'Details',
  },
]

export const DesktopColumnSchema: ColumnsDefTypes[] = [
  {
    id: 1,
    name: 'pools',
    sortable: true,
    label: '',
  },

  {
    id: 2,
    name: 'earned',
    sortable: true,
    label: 'Recent Buffet profit',
  },
  {
    id: 3,
    name: 'apr',
    sortable: true,
    label: 'Average Pool Balance',
  },
  {
    id: 4,
    name: 'details',
    sortable: true,
    label: 'APY',
  },
  {
    id: 5,
    name: 'details',
    sortable: true,
    label: 'Total staked',
  },
  {
    id: 6,
    name: 'details',
    sortable: true,
    label: 'Details',
  },
]
