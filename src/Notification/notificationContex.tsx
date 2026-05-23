/* eslint-disable react-refresh/only-export-components */
// src/contexts/NotificationContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (message: string, type?: NotificationType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info', duration: number = 5000) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newNotification: Notification = { id, type, message, duration };

      setNotifications((prev) => [...prev, newNotification]);

      if (duration > 0) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }
    },
    [removeNotification]
  );

  const success = useCallback(
    (message: string, duration?: number) => showNotification(message, 'success', duration),
    [showNotification]
  );

  const error = useCallback(
    (message: string, duration?: number) => showNotification(message, 'error', duration),
    [showNotification]
  );

  const warning = useCallback(
    (message: string, duration?: number) => showNotification(message, 'warning', duration),
    [showNotification]
  );

  const info = useCallback(
    (message: string, duration?: number) => showNotification(message, 'info', duration),
    [showNotification]
  );

  const getIcon = (type: NotificationType) => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };
    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} />;
      case 'error':
        return <XCircle {...iconProps} />;
      case 'warning':
        return <AlertCircle {...iconProps} />;
      case 'info':
        return <Info {...iconProps} />;
    }
  };

  const getStyles = (type: NotificationType) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'error':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, success, error, warning, info }}>
      {children}

      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md pointer-events-none">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring" }}
              className={`
                flex items-center gap-3 px-5 py-4 rounded-2xl backdrop-blur-xl border shadow-2xl
                pointer-events-auto
                ${getStyles(notification.type)}
              `}
            >
              {getIcon(notification.type)}
              <p className="text-sm font-semibold flex-1">{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};
export default NotificationProvider;