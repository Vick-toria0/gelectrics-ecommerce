import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { ShoppingBagIcon, ClockIcon, HeartIcon, CogIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { wishlist } = useWishlist();

  const stats = [
    { name: 'Total Orders', value: '12', change: '+2', changeType: 'positive', icon: ShoppingBagIcon },
    { name: 'Pending Orders', value: '3', change: '0', changeType: 'neutral', icon: ClockIcon },
    { name: 'Wishlist Items', value: wishlist.length.toString(), change: '', changeType: 'neutral', icon: HeartIcon },
    { name: 'Account Status', value: 'Active', change: '', changeType: 'neutral', icon: CogIcon },
  ];

  const recentOrders = [
    { id: 1, number: '#WU3D-4567', date: 'Sep 23, 2023', status: 'Delivered', total: 'GH₵149.99' },
    { id: 2, number: '#WU3D-4566', date: 'Sep 21, 2023', status: 'Shipped', total: 'GH₵87.50' },
    { id: 3, number: '#WU3D-4565', date: 'Sep 20, 2023', status: 'Processing', total: 'GH₵199.99' },
  ];

  const quickActions = [
    { name: 'Track Order', icon: ClockIcon, href: '/orders' },
    { name: 'Wishlist', icon: HeartIcon, href: '/wishlist' },
    { name: 'Account Settings', icon: CogIcon, href: '/profile' },
    ...(currentUser?.role === 'admin' ? [{ name: 'Admin Panel', icon: ShieldCheckIcon, href: '/admin/products' }] : []),
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, {currentUser?.name || 'User'}! Here's what's happening with your account.</p>
          </div>
          <div>
            <Link to="/products" className={styles.shoppingButton}>
              <ShoppingBagIcon className={styles.shoppingIcon} />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className={styles.statCard}>
                <div className={styles.statContent}>
                  <Icon className={styles.statIcon} />
                  <div className={styles.statInfo}>
                    <div className={styles.statName}>{stat.name}</div>
                    <div className={styles.statValue}>{stat.value}</div>
                  </div>
                </div>
                {stat.change && (
                  <div className={styles.statChange}>
                    <span className={stat.changeType === 'positive' ? styles.positiveChange : styles.neutralChange}>
                      {stat.change}
                    </span>{' '}
                    <span>since last month</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.dashboardGrid}>
          {/* Recent Orders */}
          <div className={styles.ordersCard}>
            <div className={styles.cardHeader}>
              <h3>Recent Orders</h3>
              <p>Your most recent orders and their status</p>
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <Link to={`/orders/${order.id}`} className={styles.orderNumber}>
                          {order.number}
                        </Link>
                      </td>
                      <td>{order.date}</td>
                      <td>
                        <span 
                          className={`${styles.orderStatus} ${
                            order.status === 'Delivered' 
                              ? styles.statusDelivered 
                              : order.status === 'Shipped' 
                                ? styles.statusShipped 
                                : styles.statusProcessing
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.total}</td>
                      <td>
                        <Link to={`/orders/${order.id}`} className={styles.orderNumber}>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link to="/orders" className={styles.viewAllLink}>
              View all orders <span>→</span>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className={styles.quickActionsCard}>
            <div className={styles.cardHeader}>
              <h3>Quick Actions</h3>
              <p>Quickly access important features</p>
            </div>
            <div className={styles.quickActionsList}>
              {quickActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <Link key={action.name} to={action.href} className={styles.actionLink}>
                    <ActionIcon className={styles.actionIcon} />
                    <span className={styles.actionText}>{action.name}</span>
                  </Link>
                );
              })}
              <button onClick={logout} className={styles.signOutButton}>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
