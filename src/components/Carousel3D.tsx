import { motion } from "framer-motion";

const projectImages = [
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=280&fit=crop&fm=webp&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=280&fit=crop&fm=webp&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=280&fit=crop&fm=webp&q=80",
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=280&fit=crop&fm=webp&q=80",
  "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=280&fit=crop&fm=webp&q=80",
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=280&fit=crop&fm=webp&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=280&fit=crop&fm=webp&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=280&fit=crop&fm=webp&q=80",
];

const Carousel3D = () => {
  return (
    <div className="carousel-3d-container">
      <div className="carousel-3d">
        {projectImages.map((image, index) => (
          <div
            key={index}
            className="carousel-3d-item"
            style={{
              transform: `rotateX(${index * 45}deg) translateZ(280px)`,
            }}
          >
            <motion.img
              src={image}
              alt={`Project ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
              whileHover={{ scale: 1.05 }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel3D;
