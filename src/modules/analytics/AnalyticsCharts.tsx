import { useMemo } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Filler, Tooltip, Legend)

export type AnalyticsRecord = { id: string; title?: string; category?: string; status?: string; priority?: string; created_at?: string; department?: { name?: string } }
export type AnalyticsSummary = { total: number; resolved: number; inProgress: number; unassigned: number; resolutionRate: number; averageDaily: number; trend: number; categoryRows: Array<{label:string;value:number}>; statusRows: Array<{label:string;value:number;color:string}>; timeline: {labels:string[]; reports:number[]; resolved:number[]}; departments: Array<{label:string;value:number;resolved:number}> }

const tooltip = { backgroundColor:'#17233a', padding:10, titleFont:{size:12}, bodyFont:{size:11}, displayColors:false }
const noLegend = { display:false }
const AnalyticsCharts = ({ summary, onCategoryClick }: { summary: AnalyticsSummary; onCategoryClick: (category:string) => void }) => {
  const trend = useMemo<ChartData<'line'>>(() => ({ labels:summary.timeline.labels, datasets:[{label:'New reports',data:summary.timeline.reports,borderColor:'#3154c5',backgroundColor:'rgba(49,84,197,.10)',fill:true,tension:.35,pointRadius:0,pointHoverRadius:4,borderWidth:2.5},{label:'Resolved',data:summary.timeline.resolved,borderColor:'#27a45b',backgroundColor:'transparent',tension:.35,pointRadius:0,pointHoverRadius:4,borderWidth:2}] }), [summary])
  const categories = useMemo<ChartData<'bar'>>(() => ({ labels:summary.categoryRows.map(row=>row.label),datasets:[{label:'Reports',data:summary.categoryRows.map(row=>row.value),backgroundColor:'#6681de',hoverBackgroundColor:'#3154c5',borderRadius:6,borderSkipped:false,maxBarThickness:32}] }), [summary])
  const statuses = useMemo<ChartData<'doughnut'>>(() => ({ labels:summary.statusRows.map(row=>row.label),datasets:[{data:summary.statusRows.map(row=>row.value),backgroundColor:summary.statusRows.map(row=>row.color),borderWidth:0,hoverOffset:5}] }), [summary])
  const lineOptions: ChartOptions<'line'> = {responsive:true,maintainAspectRatio:false,plugins:{legend:noLegend,tooltip},scales:{x:{grid:{display:false},ticks:{color:'#8591a5',font:{size:10},maxTicksLimit:8}},y:{beginAtZero:true,border:{display:false},grid:{color:'#edf0f5'},ticks:{color:'#8591a5',font:{size:10},precision:0}}}}
  const barOptions: ChartOptions<'bar'> = {responsive:true,maintainAspectRatio:false,plugins:{legend:noLegend,tooltip},onClick:(_,elements)=>{const index=elements[0]?.index;if(index !== undefined)onCategoryClick(summary.categoryRows[index].label)},scales:{x:{grid:{display:false},border:{display:false},ticks:{color:'#64728a',font:{size:10}}},y:{beginAtZero:true,border:{display:false},grid:{color:'#edf0f5'},ticks:{color:'#8591a5',font:{size:10},precision:0}}}}
  const doughnutOptions: ChartOptions<'doughnut'> = {responsive:true,maintainAspectRatio:false,cutout:'72%',plugins:{legend:noLegend,tooltip}}
  return <div className="analytics-charts">
    <section className="analytics-card trend-card"><div className="analytics-card-head"><div><h3>Service demand trend</h3><p>New reports compared with completed work</p></div><span className="chart-key"><i className="new" /> New <i className="resolved" /> Resolved</span></div><div className="chart-area"><Line data={trend} options={lineOptions} /></div></section>
    <section className="analytics-card status-card"><div className="analytics-card-head"><div><h3>Resolution health</h3><p>Current report status distribution</p></div></div><div className="donut-layout"><div className="donut-area"><Doughnut data={statuses} options={doughnutOptions} /><div className="donut-center"><strong>{summary.resolutionRate}%</strong><span>resolved</span></div></div><div className="status-legend">{summary.statusRows.map(status=><div key={status.label}><i style={{background:status.color}} /><span>{status.label}</span><strong>{status.value}</strong></div>)}</div></div></section>
    <section className="analytics-card category-card"><div className="analytics-card-head"><div><h3>Reports by category</h3><p>Select a bar to filter the table below</p></div></div><div className="chart-area"><Bar data={categories} options={barOptions} /></div></section>
    <section className="analytics-card department-card"><div className="analytics-card-head"><div><h3>Department workload</h3><p>Open volume and completed cases</p></div></div><div className="department-list">{summary.departments.length ? summary.departments.map(dept=><div className="department-row" key={dept.label}><div><strong>{dept.label}</strong><span>{dept.value} reports · {dept.resolved} resolved</span></div><div className="department-bar"><i style={{width:`${dept.value ? (dept.resolved / dept.value) * 100 : 0}%`}} /></div></div>) : <p className="chart-empty">Department data is not available for these reports.</p>}</div></section>
  </div>
}
export default AnalyticsCharts
