import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  UserRound,
  TrendingUp,
  Activity
} from 'lucide-react';

const iconMap = {
    FaUserGraduate: GraduationCap,
    FaChalkboardTeacher: UserRound,
    FaUserTie: ShieldCheck,
    FaHardHat: Briefcase,
    FaUsers: Users,
};

const colorVariants = {
    blue: "from-blue-500 to-indigo-600 shadow-blue-200",
    green: "from-emerald-400 to-green-600 shadow-green-200",
    purple: "from-purple-500 to-primary shadow-purple-200",
    orange: "from-orange-400 to-rose-500 shadow-orange-200",
    red: "from-rose-500 to-red-600 shadow-red-200",
};

const TarjetaEstadisticas = ({
    title,
    value,
    icon,
    color = 'blue',
    description,
    loading = false
}) => {
    const IconComponent = iconMap[icon] || Activity;
    const gradientClass = colorVariants[color] || colorVariants.blue;

    const formatNumber = (num) => {
        return new Intl.NumberFormat('es-ES').format(num);
    };

    if (loading) {
        return (
            <div className="glass-card rounded-3xl p-6 h-36 animate-pulse flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="w-24 h-4 bg-slate-200 rounded-full"></div>
                    <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
                </div>
                <div className="w-16 h-8 bg-slate-200 rounded-lg"></div>
            </div>
        );
    }

    return (
        <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-card rounded-[32px] p-6 relative overflow-hidden group cursor-default"
        >
            {/* Background Decoration */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${gradientClass} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{title}</p>
                    <h3 className="text-3xl font-black text-slate-800 tracking-tighter">
                        {formatNumber(value)}
                    </h3>
                </div>
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradientClass} text-white shadow-lg`}>
                    <IconComponent size={24} strokeWidth={2.5} />
                </div>
            </div>

            <div className="flex items-center gap-2 mt-2 relative z-10">
                <div className="flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp size={12} className="mr-1" />
                    ACTIVO
                </div>
                {description && (
                    <p className="text-[11px] font-medium text-slate-400 truncate">{description}</p>
                )}
            </div>
            
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </motion.div>
    );
};

export default TarjetaEstadisticas;