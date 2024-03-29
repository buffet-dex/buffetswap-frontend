import React, { useEffect, Dispatch, SetStateAction } from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import useTheme from 'hooks/useTheme'
import { formatAmount } from 'views/Info/utils/formatInfoNumbers'
import { LineChartLoader } from 'views/Info/components/ChartLoaders'
import { useTranslation } from 'contexts/Localization'

export type LineChartProps = {
  data: any[]
  setHoverValue: Dispatch<SetStateAction<number | undefined>> // used for value on hover
  setHoverDate: Dispatch<SetStateAction<string | undefined>> // used for label of value
} & React.HTMLAttributes<HTMLDivElement>

// Calls setHoverValue and setHoverDate when part of chart is hovered
// Note: this NEEDs to be wrapped inside component and useEffect, if you plug it as is it will create big render problems (try and see console)
const HoverUpdater = ({ locale, payload, setHoverValue, setHoverDate }) => {
  useEffect(() => {
    setHoverValue(payload.value)
    setHoverDate(payload.time.toLocaleString(locale, { year: 'numeric', day: 'numeric', month: 'short' }))
  }, [locale, payload.value, payload.time, setHoverValue, setHoverDate])

  return null
}

/**
 * Note: remember that it needs to be mounted inside the container with fixed height
 */
const LineChart = ({ data, setHoverValue, setHoverDate }: LineChartProps) => {
  const {
    currentLanguage: { locale },
  } = useTranslation()
  const { theme } = useTheme()
  if (!data || data.length === 0) {
    return <LineChartLoader />
  }
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        width={459}
        height={308}
        margin={{
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
        }}
        onMouseLeave={() => {
          if (setHoverDate) setHoverDate(undefined)
          if (setHoverValue) setHoverValue(undefined)
        }}
      >
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => time.toLocaleDateString(undefined, { day: '2-digit' })}
          minTickGap={7}
          fontSize="10px"
          tick={{ fill: '#202020', fontWeight: 700 }}
        />
        <YAxis
          dataKey="value"
          tickCount={8}
          axisLine={false}
          tickLine={false}
          fontSize="10px"
          tickFormatter={(val) => `$${formatAmount(val)}`}
          orientation="right"
          tick={{ dx: 25, fill: '#202020', fontWeight: 700 }}
        />
        <Tooltip
          cursor={{ stroke: theme.colors.secondary }}
          contentStyle={{ display: 'none' }}
          formatter={(tooltipValue, name, props) => (
            <HoverUpdater
              locale={locale}
              payload={props.payload}
              setHoverValue={setHoverValue}
              setHoverDate={setHoverDate}
            />
          )}
        />
        <Area dataKey="value" type="linear" stroke="#EF5823" fill="none" strokeWidth={2} activeDot={{ r: 4 }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default LineChart
