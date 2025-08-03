import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { FaBell, FaUsers, FaBuilding, FaFileAlt, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const SuperAdmin = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

    // Traffic Stats Line Chart
    const trafficChart = {
        series: [{
            name: 'Traffic',
            data: [100, 150, 200, 180, 250, 300, 280, 320, 290, 250, 200, 180]
        }],
        options: {
            chart: {
                height: 300,
                type: 'line',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            colors: ['#0073B6'],
            grid: {
                borderColor: '#E0E6ED',
                strokeDashArray: 5,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: {
                    style: {
                        fontSize: '12px',
                    },
                },
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value;
                    },
                    style: {
                        fontSize: '12px',
                    },
                },
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return value + ' users';
                    },
                },
            },
        },
    };

    // Traffic Stats by Location Donut Chart
    const locationChart = {
        series: [52.7, 22.5, 10.9, 11.2, 9.5, 6.4],
        options: {
            chart: {
                type: 'donut',
                height: 300,
                fontFamily: 'Nunito, sans-serif',
            },
            labels: ['Sharjah', 'Ajman', 'Ras Al-Khaimah', 'Fujairah', 'Al Ain', 'Others'],
            colors: ['#8e7cf0', '#ff8b8b', '#3ecf8e', '#ffb547', '#4f8cff', '#3edfa0'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '12px',
                markers: {
                    width: 10,
                    height: 10,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 2,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(1) + '%';
                },
                style: {
                    fontSize: '12px',
                    fontWeight: 'bold',
                },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val.toFixed(1) + '%';
                    },
                },
            },
        },
    };

    const statsCards = [
        {
            title: 'Total Users',
            value: '7,265',
            change: '+1.01%',
            changeType: 'positive',
            icon: <FaUsers className="text-2xl" />
        },
        {
            title: 'New Users',
            value: '156',
            change: '+15.02%',
            changeType: 'positive',
            icon: <FaUsers className="text-2xl" />
        },
        {
            title: 'Active Users',
            value: '3,671',
            change: '-0.03%',
            changeType: 'negative',
            icon: <FaUsers className="text-2xl" />
        },
        {
            title: 'Banned Users',
            value: '2,318',
            change: '+5.68%',
            changeType: 'positive',
            icon: <FaUsers className="text-2xl" />
        }
    ];

    const timePeriods = ['Weekly', 'Monthly', 'Yearly', 'Custom'];

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Overview</h1>

                {/* Time Period Buttons */}
                <div className="flex gap-2 mb-4">
                    {timePeriods.map((period) => (
                        <button
                            key={period}
                            onClick={() => setSelectedPeriod(period)}
                            className={`px-4 py-1 text-sm rounded-md transition-colors ${selectedPeriod === period
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((card, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-gray-500">{card.icon}</div>
                            <div className={`flex items-center gap-1 text-sm ${card.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {card.changeType === 'positive' ? <FaArrowUp /> : <FaArrowDown />}
                                {card.change}
                            </div>
                        </div>
                        <div className="text-2xl font-bold mb-1">{card.value}</div>
                        <div className="text-gray-500 text-sm">{card.title}</div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Stats Line Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Traffic Stats</h3>
                    <ReactApexChart
                        series={trafficChart.series}
                        options={trafficChart.options}
                        type="line"
                        height={250}
                    />
                </div>

                {/* Traffic Stats by Location Donut Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Traffic Stats by Location</h3>

                    <ReactApexChart
                        series={locationChart.series}
                        options={locationChart.options}
                        type="donut"
                        height={250}
                    />
                </div>
            </div>

        </div>
    );
};

export default SuperAdmin; 