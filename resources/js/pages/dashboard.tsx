import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  TrendingUp, 
  FileText, 
  Ship, 
  AlertCircle, 
  Clock, 
  CheckCircle2,
  ArrowUpRight,
  Calendar
} from 'lucide-react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Sample data - replace with real data from props
const dashboardData = {
  purchaseOrders: {
    total: 24,
    pending: 8,
    processing: 5,
    shipped: 7,
    delivered: 4,
  },
  invoices: {
    total: 18,
    paid: 12,
    pending: 4,
    overdue: 2,
  },
  shipments: {
    inTransit: 12,
    atPort: 5,
    customs: 3,
    delivered: 28,
  },
  alerts: [
    {
      id: 1,
      type: 'urgent',
      message: '2 invoices overdue',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'warning',
      message: '5 shipments delayed',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'info',
      message: '3 POs need approval',
      time: '1 day ago',
    },
  ],
  recentActivities: [
    {
      id: 1,
      action: 'Invoice INV-2024-045 marked as paid',
      user: 'John Doe',
      time: '10 minutes ago',
    },
    {
      id: 2,
      action: 'PO-2024-089 created',
      user: 'Jane Smith',
      time: '1 hour ago',
    },
    {
      id: 3,
      action: 'Shipment SHP-2024-123 cleared customs',
      user: 'System',
      time: '2 hours ago',
    },
    {
      id: 4,
      action: 'Invoice INV-2024-044 sent to supplier',
      user: 'Mike Johnson',
      time: '3 hours ago',
    },
  ],
  upcomingDeadlines: [
    {
      id: 1,
      title: 'Payment due: INV-2024-046',
      date: '2024-02-10',
      priority: 'high',
    },
    {
      id: 2,
      title: 'ETA: Shipment SHP-2024-125',
      date: '2024-02-12',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'PO approval deadline',
      date: '2024-02-15',
      priority: 'low',
    },
  ],
}

export default function Dashboard() {
    const { purchaseOrders, invoices, shipments, alerts, recentActivities, upcomingDeadlines } = dashboardData

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 bg-linear-to-br from-zinc-50 to-zinc-100">
                {/* Alert Bar */}
                {alerts.length > 0 && (
                  <Card className="border-amber-200 bg-amber-50">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-amber-900 mb-2">Attention Required</h3>
                          <div className="space-y-2">
                            {alerts.slice(0, 2).map(alert => (
                              <div key={alert.id} className="flex items-center justify-between text-sm">
                                <span className="text-amber-800">{alert.message}</span>
                                <span className="text-amber-600 text-xs">{alert.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-amber-300 hover:bg-amber-100">
                          View All
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Purchase Orders */}
                  <Card className="border-zinc-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-blue-600" />
                        Purchase Orders
                      </CardDescription>
                      <CardTitle className="text-3xl">{purchaseOrders.total}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">Pending</span>
                          <span className="font-semibold text-amber-600">{purchaseOrders.pending}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">Processing</span>
                          <span className="font-semibold text-blue-600">{purchaseOrders.processing}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">Shipped</span>
                          <span className="font-semibold text-purple-600">{purchaseOrders.shipped}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Invoices */}
                  <Card className="border-zinc-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-emerald-600" />
                        Invoices
                      </CardDescription>
                      <CardTitle className="text-3xl">{invoices.total}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">Paid</span>
                          <span className="font-semibold text-emerald-600">{invoices.paid}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">Pending</span>
                          <span className="font-semibold text-amber-600">{invoices.pending}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">Overdue</span>
                          <span className="font-semibold text-red-600">{invoices.overdue}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Shipments */}
                  <Card className="border-zinc-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2">
                        <Ship className="h-4 w-4 text-purple-600" />
                        Active Shipments
                      </CardDescription>
                      <CardTitle className="text-3xl">{shipments.inTransit + shipments.atPort + shipments.customs}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">In Transit</span>
                          <span className="font-semibold text-blue-600">{shipments.inTransit}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">At Port</span>
                          <span className="font-semibold text-amber-600">{shipments.atPort}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-zinc-600">In Customs</span>
                          <span className="font-semibold text-purple-600">{shipments.customs}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Total Delivered */}
                  <Card className="border-zinc-200 hover:shadow-lg transition-shadow bg-emerald-50">
                    <CardHeader className="pb-2">
                      <CardDescription className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        Completed
                      </CardDescription>
                      <CardTitle className="text-3xl text-emerald-700">{shipments.delivered}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-emerald-600">Successfully delivered this month</p>
                      <div className="flex items-center gap-1 mt-2 text-emerald-700">
                        <TrendingUp className="h-3 w-3" />
                        <span className="text-xs font-semibold">+12% vs last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Activities */}
                  <Card className="lg:col-span-2 border-zinc-200">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Recent Activities</CardTitle>
                          <CardDescription>Latest updates from your team</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          View All
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map(activity => (
                          <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-zinc-100 last:border-0 last:pb-0">
                            <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-zinc-900">{activity.action}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-zinc-500">{activity.user}</span>
                                <span className="text-xs text-zinc-400">•</span>
                                <span className="text-xs text-zinc-500">{activity.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Deadlines */}
                  <Card className="border-zinc-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Upcoming Deadlines
                      </CardTitle>
                      <CardDescription>Tasks requiring attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {upcomingDeadlines.map(deadline => (
                          <div key={deadline.id} className="p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <p className="text-sm font-medium text-zinc-900">{deadline.title}</p>
                              <Badge 
                                variant="outline" 
                                className={
                                  deadline.priority === 'high' 
                                    ? 'bg-red-50 text-red-700 border-red-200' 
                                    : deadline.priority === 'medium'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-blue-50 text-blue-700 border-blue-200'
                                }
                              >
                                {deadline.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-zinc-500">
                              <Calendar className="h-3 w-3" />
                              {deadline.date}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4" size="sm">
                        View Calendar
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-zinc-200">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks and shortcuts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                        <Package className="h-5 w-5" />
                        <span className="text-sm">New PO</span>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                        <FileText className="h-5 w-5" />
                        <span className="text-sm">New Invoice</span>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                        <Ship className="h-5 w-5" />
                        <span className="text-sm">Track Shipment</span>
                      </Button>
                      <Button variant="outline" className="h-auto flex-col gap-2 py-4">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-sm">View Reports</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
        </AppLayout>
    );
}