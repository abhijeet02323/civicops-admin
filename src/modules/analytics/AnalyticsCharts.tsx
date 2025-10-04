import React from 'react'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  // for doughnut
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
)

const AnalyticsCharts: React.FC = () => {
  // Sample data — replace with real API data later
  const categories = ['Pothole', 'Streetlight', 'Garbage', 'Water', 'Other']
  const reportsByCategory = [120, 80, 45, 32, 20]

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
  const monthlyReports = [80, 95, 110, 130, 145, 160, 170, 180, 190]

  const barData = {
    labels: categories,
    datasets: [
      {
        label: 'Reports',
        data: reportsByCategory,
        backgroundColor: ['#3f51b5', '#ff5722', '#ffc107', '#00bcd4', '#9c27b0'],
      },
    ],
  }

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Total Reports',
        data: monthlyReports,
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25,118,210,0.1)',
        tension: 0.3,
      },
    ],
  }

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
    },
  }

  // Doughnut: report status breakdown
  const statusLabels = ['Pending', 'In Progress', 'Resolved', 'Approved', 'Declined', 'Completed']
  const statusDataValues = [45, 30, 60, 12, 8, 25]
  const doughnutData = {
    labels: statusLabels,
    datasets: [
      {
        data: statusDataValues,
        backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#6366f1', '#ef4444', '#06b6d4'],
        hoverOffset: 6,
      },
    ],
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Reports by Category" />
          <CardContent>
            <Bar data={barData} options={commonOptions} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Monthly Reports" />
          <CardContent>
            <Line data={lineData} options={commonOptions} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Report Status Breakdown" />
          <CardContent>
            <Doughnut data={doughnutData} options={commonOptions} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AnalyticsCharts
