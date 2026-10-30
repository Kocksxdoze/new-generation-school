"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

export default function IntroVideo() {
  const [isMounted, setIsMounted] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // If browser policy blocks unmuted autoplay without prior interaction,
          // play video smoothly and unmute on first user click/touch
          console.warn("Unmuted autoplay restricted by browser policy; unmuting on first interaction:", err);
          video.muted = true;
          video.play().catch(() => {});

          const unmute = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
            }
            window.removeEventListener("click", unmute);
            window.removeEventListener("touchstart", unmute);
            window.removeEventListener("keydown", unmute);
          };

          window.addEventListener("click", unmute, { once: true });
          window.addEventListener("touchstart", unmute, { once: true });
          window.addEventListener("keydown", unmute, { once: true });
        });
      }
    }
  }, []);

  const handleFinish = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsMounted(false);
    }, 600);
  };

  if (!isMounted) return null;

  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={999999}
      bg="#000000"
      display="flex"
      alignItems="center"
      justifyContent="center"
      transition="opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
      opacity={isFading ? 0 : 1}
      pointerEvents={isFading ? "none" : "auto"}
    >
      <video
        ref={videoRef}
        src="/title.mp4"
        autoPlay
        playsInline
        onEnded={handleFinish}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          backgroundColor: "#000000",
        }}
      />

      {/* Top Bar with Skip Button Only - No Logo */}
      <Flex
        position="absolute"
        top={0}
        left={0}
        right={0}
        p={{ base: 4, sm: 6, md: 8 }}
        justify="flex-end"
        align="center"
        zIndex={10}
        pointerEvents="auto"
      >
        <Button
          onClick={handleFinish}
          size={{ base: "sm", md: "md" }}
          bg="rgba(0, 0, 0, 0.45)"
          backdropFilter="blur(16px)"
          color="white"
          border="1px solid rgba(255, 255, 255, 0.3)"
          rounded="full"
          px={{ base: 4, sm: 6 }}
          py={2.5}
          fontSize={{ base: "xs", sm: "sm" }}
          fontWeight="700"
          cursor="pointer"
          transition="all 0.25s ease"
          _hover={{
            bg: "#FFB800",
            color: "#002045",
            borderColor: "#FFB800",
            transform: "translateX(2px)",
            boxShadow: "0 4px 15px rgba(255, 184, 0, 0.4)",
          }}
          display="inline-flex"
          alignItems="center"
          gap={2}
        >
          <span>Пропустить</span>
          <Box as="span" className="material-symbols-outlined" fontSize="16px">
            arrow_forward
          </Box>
        </Button>
      </Flex>
    </Box>
  );
}
