"use client";
import Slider from "react-slick";
import Image from "next/image";
import Container from "./Container";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function BlockCarousel({block, images}) {

    const settings = {
        // className: "slider variable-width",
        dots: true,
        infinite: true,
        centerMode: true,
        // Espace à gauche et à droite (ajustez à votre convenance)
        centerPadding: "200px",
        slidesToShow: 1,
        speed: 500,
        // variableWidth: true
    };

    // console.log("Carousel : ", images);
    return (
        <Container size={block.size || "full"} >
            <Slider {...settings}>
                {images && images.map((image, index)=> (
                    <div key={index}>
                        <img  src={`http://localhost:1337${image.image.url}`}/>
                        {/* <Image
                            src={`http://localhost:1337${image.image.url}`}
                            alt={image.legende}
                            width={1200} // Largeur de vos images
                            height={800} // Hauteur de vos images
                            style={{ width: "100%", height: "auto" }}
                        /> */}
                    </div>
                    )   
                )}
            </Slider>
        </Container>
    )
}