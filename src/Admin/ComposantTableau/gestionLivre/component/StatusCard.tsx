import React from 'react';

interface StatCardProps {
  value: number | string;
  title: string;
  icon: React.ReactNode;
  iconBackgroundColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  title,
  icon,
  iconBackgroundColor = 'bg-pink-400',
}) => {
  return (
    <div className="bg-white  rounded-2xl p-5 flex items-center justify-between shadow-xl w-64">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-sm font-medium text-gray-400">{title}</span>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBackgroundColor}`}>
        {icon}
      </div>
    </div>
  );
};

export default StatCard;