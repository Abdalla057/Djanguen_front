import React from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { EtatNotification } from "../../type/ajouterAudioType";

interface ToastNotificationProps {
  notification: EtatNotification;
  estModal:     boolean;
}

const ToastNotification = ({ notification, estModal }: ToastNotificationProps) => {
  if (!notification.afficher) return null;

  return (
    <div className={`${estModal ? "fixed" : "absolute"} top-4 right-4 z-[60] animate-in slide-in-from-top-2 duration-300`}>
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${
          notification.type === "succes"
            ? "bg-emerald-500 border-emerald-400 text-white"
            : "bg-red-500 border-red-400 text-white"
        }`}
      >
        {notification.type === "succes"
          ? <CheckCircle className="w-6 h-6" />
          : <AlertCircle className="w-6 h-6" />}
        <p className="font-semibold">{notification.message}</p>
      </div>
    </div>
  );
};

export default ToastNotification;