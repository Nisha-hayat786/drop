import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { IoDocumentTextSharp } from 'react-icons/io5';
import ReactApexChart from 'react-apexcharts';

const Dashboard = () => {
    const revenueChart = {
        series: [
            {
                name: 'Income',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Expenses',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: ['#0073B6', '#000'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#0073B6',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#000',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: false,
            },
            grid: {
                borderColor: '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.28,
                    opacityTo: 0.05,
                    stops: [45, 100],
                },
            },
        },
    };

    const pieChartData = {
        series: [8, 34, 12, 18, 15, 5],
        options: {
            chart: {
                type: 'pie',
                height: 350,
                fontFamily: 'Nunito, sans-serif',
            },
            labels: ['Like', 'Share', 'Map', 'Drop-Off', 'Book', 'Deal'],
            colors: [
                '#8e7cf0', // Like
                '#ff8b8b', // Share
                '#3ecf8e', // Map
                '#ffb547', // Drop-Off
                '#4f8cff', // Book
                '#3edfa0', // Deal
            ],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 8,
                    vertical: 0,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val.toFixed(0) + '%';
                },
                style: {
                    fontSize: '16px',
                    fontWeight: 'bold',
                },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + '%';
                    },
                },
            },
        },
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Top Stats Row */}
            <div className="flex gap-4 flex-wrap">
                {/* Watch Statics */}
                <div className="flex-1 min-w-[320px] bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">

                        <div className="font-semibold text-lg mb-3">Watch Statics</div>
                        <div className="flex items-center gap-2">
                            <div className="bg-gray-300 px-3 py-1 text-xs rounded-full">Weekly</div>
                            <div className="bg-black text-white px-3 py-1 text-xs rounded-full">Monthly</div>
                            <div className="bg-gray-300 px-3 py-1 text-xs rounded-full">Yearly</div>
                        </div>
                    </div>
                    {/* Chart Placeholder */}
                    <div className="panel h-full xl:col-span-2 mt-8">
                        <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={250} />
                        <div className="flex justify-between text-base pt-6 mt-4 border-t border-gray-400 w-full">
                            <div className='flex gap-16 items-center w-1/2'>
                                <div className='flex items-center gap-6'>
                                    <IoDocumentTextSharp className='text-xl' />
                                    <p className='text-gray-600 text-sm'>Average Watch <br /> Time</p>
                                </div>
                                <p className='text-3xl font-semibold'>300 <span className='text-xl'>Mins</span></p>
                            </div>
                            <div className='flex gap-16 items-center w-1/2'>
                                <div className='flex items-center gap-6'>
                                    <FaHeart className='text-xl' />
                                    <p className='text-gray-600 text-sm'>Total Number of  <br /> Likes</p>
                                </div>
                                <p className='text-3xl font-semibold'>300K</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Clicks Statics */}
                <div className="flex-1 min-w-[240px] max-w-[400px] bg-white rounded-xl p-6 shadow-sm">
                    <div className="font-semibold text-lg">Clicks Statics</div>
                    <div className="rounded-lg flex items-center justify-center text-gray-400 h-full -mt-4">
                        <ReactApexChart series={pieChartData.series} options={pieChartData.options} type="pie" height={300} />
                    </div>
                </div>
            </div>
            {/* Popular Posts */}
            <div>
                <div className="font-bold text-2xl mb-4">Popular Posts</div>
                <div className="flex gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-xl overflow-hidden w-[25%] shadow-md flex flex-col p-3 border border-gray-200">
                            <div className="h-36 bg-gray-200 bg-cover bg-center rounded-xl" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80)' }} />
                            <div className="pt-2 flex flex-col flex-1">
                                <div className="text-sm mb-2">Discover the allure of Russian beauty through AI, showcasing every feature of the face.</div>
                                <div className="text-xs text-gray-500 mb-2">Dubai, UAE</div>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="font-semibold text-lg">$ 500 <span className="font-normal text-xs text-gray-500">/ Per Person</span></div>
                                    <button className="bg-black text-white rounded-full px-4 py-2 text-xs cursor-pointer">View Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;