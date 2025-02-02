import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";
import { loadFont } from "@remotion/google-fonts/Rubik";
import richestPeople from "../public/data/richest-people.json";

const { fontFamily } = loadFont();

export const RichestList: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Konfigurasi kartu
  const cardWidth = 400;
  const cardSpacing = -0;
  const totalWidth = richestPeople.length * (cardWidth + cardSpacing);

  // Mulai dari sisi kanan layar (kartu pertama sepenuhnya di luar layar)
  const startPosition = width + cardWidth;

  // Animasi scroll dari kanan ke kiri
  const scrollX = interpolate(
    frame,
    [30, 50*60], // Durasi animasi (sesuaikan dengan kebutuhan)
    [startPosition, -(totalWidth - width)], // Dari kanan ke kiri
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: (t) => t // Changed easing to linear
    }
  );

  // Fungsi untuk mengecek apakah kartu terlihat sepenuhnya
  const isCardFullyVisible = (cardIndex: number) => {
    const cardPosition = startPosition + cardIndex * (cardWidth + cardSpacing) + scrollX;
    return cardPosition >= 70 && cardPosition + cardWidth <= width;
  };


  return (
    <AbsoluteFill
      style={{
      backgroundColor: "#fff",
      backgroundImage: `
      linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(to right, rgba(0, 0, 0, 0.1) 0px, transparent 0px),
      linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0px, transparent 0px)
        `,
      backgroundSize: "20px 20px, 20px 20px, 100px 100px, 100px 100px",
      zIndex: -1,
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      }}
    >

      
      <div
        style={{
          display: "flex",
          position: "absolute",
          gap: `${cardSpacing}px`,
          transform: `translateX(${scrollX}px)`,
          padding: "0 20px",
        }}
      >
        {richestPeople.map((person, index) => {
          const isVisible = isCardFullyVisible(index);
          const isFirst = index === 0;
          const numberOpacity = interpolate(
            frame % 30,
            [0, 5, 25, 30],
            [0, 1, 1, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const numberTranslateY = interpolate(
            frame % 30,
            [0, 5, 25, 30],
            [50, 0, 0, 50],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          return (
            <div
              key={person.rank}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: cardWidth,
                  height: "700px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "24px",
                  borderColor: "rgb(0, 0, 0)",
                  borderWidth: "10px",
                  borderStyle: "solid",
                  boxShadow:
                    "0 20px 15px -5px rgb(0 0 0 / 0.1), 0 4px 5px -3px rgb(0 0 0 / 0.1)",
       
                  marginRight: "2rem",
                  marginTop: "12rem",
                  marginLeft: index === 0 ? '200rem' : '0.0rem',
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
               
                {/* Image */}
                <div
                  style={{
                    marginTop: "20px",
                    marginBottom: "1.5rem",
                  }}
                >
                  <img
                    src={person.image}
                    alt={person.name}
                    style={{
                      width: "350px",
                      height: "310px",
                      borderRadius: "15px",
                      objectFit: "cover",
                      boxShadow: "0 5px 10px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                </div>

                {/* Details */}
                <div
                  style={{
                    textAlign: "center",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <div
                    style={{
                      fontSize: "2.1rem",
                      fontWeight: "900",
                      color: "#1a365d",
                      marginBottom: "0.5rem",
                      fontFamily,
                      
                    }}
                  >
                    {person.name}
                  </div>

                  <div
                    style={{
                      fontSize: "1.5rem",
                      color: "#1a365d",
                      marginBottom: "0.75rem",
                      fontFamily,
                    }}
                  >
                    📍 {person.country}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.75rem",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "2rem",
                        fontWeight: "600",
                        color: "#2d3748",
                        fontFamily,
                      }}
                    >
                      {person.netWorth}
                    </div>
                    <div
                      style={{
                        fontSize: "1rem",
                        color: person.change.startsWith("+")
                          ? "#48bb78"
                          : "#f56565",
                        fontFamily,
                      }}
                    >
                      {person.change}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "1rem",
                      color: "#4a5568",
                      fontFamily,
                    }}
                  >
                    <span style={{ fontWeight: "600" }}>Company:</span>{" "}
                    {person.company}
                  </div>
                </div>
              </div>

              {/* Large Rank Number */}
              
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    bottom: "-180px",                       
                    fontSize: "5rem",
                    fontWeight: "900",
                    color: "rgba(0,0,0,0.8)",
                    fontFamily,
                    opacity: 9,
                    marginLeft: index === 0 ? '200rem' : '0.0rem',
                  }}
                >
                  #{person.rank}
                </div>
              
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};