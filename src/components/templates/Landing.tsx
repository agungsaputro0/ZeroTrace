import Button from "../atoms/Button";
import { useNavigate } from "react-router-dom";
import { LoginOutlined } from "@ant-design/icons";
import { CompassOutlined, BarChartOutlined, ShoppingOutlined } from '@ant-design/icons';
import FeatureCard from "../atoms/FeatureCard";
import Slider from "react-slick";
import { MdLocalShipping } from 'react-icons/md';

type LandingProps = {
    layoutMessage: string;
    layoutTitle: string;
}

const LandingLayouts = (props: LandingProps) => {
    const navigate = useNavigate();
    const { layoutTitle, layoutMessage } = props;

    const features = [
        {
            icon: <CompassOutlined style={{ fontSize: '48pt', marginTop: '10px', color: '#008080' }} />,
            title: 'Cari Bank Sampah',
            description: 'Temukan bank sampah terdekat dari lokasi Anda saat ini',
        },
        {
            icon: <MdLocalShipping style={{ fontSize: '48pt', marginTop: '10px', color: '#008080' }} />,
            title: 'Pick Up',
            description: 'Setorkan sampah Anda melalui bank sampah keliling tanpa perlu ke lokasi',
        },
        {
            icon: <ShoppingOutlined style={{ fontSize: '48pt', marginTop: '10px', color: '#008080' }} />,
            title: 'Marketplace',
            description: 'Temukan produk-produk terbaik hasil daur ulang dari berbagai penjual',
        },
        {
            icon: <BarChartOutlined style={{ fontSize: '48pt', marginTop: '10px', color: '#008080' }} />,
            title: 'Insight',
            description: 'Dapatkan analisis performa dan laporan transaksi Anda di WasteTrack',
        },
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
        centerMode: true,
        centerPadding: "0px",
        slidesToShow: 3,
        swipeToSlide: true,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1050,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 750,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
              }
            }
          ]
    };

    return (
        <div className="pt-40 pb-10 flex flex-col justify-between items-center min-h-screen px-4">
            <div className="w-full px-10">
                <center>
                    <h1 className="text-4xl font-bold text-white">
                        {layoutTitle} <span className="text-amber-400">Terra</span>Hive
                    </h1>
                    <h3 className="mt-2 text-2xl text-white">{layoutMessage}</h3>
                    <Button
                        message=""
                        onClick={() => navigate("/login")}
                        variant="hover:bg-lime-300 hover:text-lime-950 bg-transparent mt-8 border-solid border-2 border-lime-400 text-white sm:h-[35px] h-[35px]">
                        <LoginOutlined /> &nbsp;Login
                    </Button>
                </center>
                <div className="mt-20 custom-slider-container">
                    <Slider {...sliderSettings}>
                        {features.map((feature, index) => (
                            <div key={index} className="custom-slide justify-items-center">
                                <FeatureCard
                                    icon={feature.icon}
                                    title={feature.title}
                                    description={feature.description}
                                />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
}

export default LandingLayouts;
