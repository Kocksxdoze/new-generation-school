"use client";

import { useState, useRef, useEffect } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";

export default function IntroVideo() {
  const [isMounted, setIsMounted] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay deferred or blocked by browser policy:", err);
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

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
    }
  };

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
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
        muted
        playsInline
        onEnded={handleFinish}
        onTimeUpdate={handleTimeUpdate}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Top Header Overlay with Logo & Skip Button */}
      <Flex
        position="absolute"
        top={0}
        left={0}
        right={0}
        p={{ base: 4, sm: 6, md: 8 }}
        justify="space-between"
        align="center"
        bgGradient="linear(to-b, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)"
        zIndex={10}
      >
        <Flex align="center" gap={3}>
          <Box
            as="img"
            src="/ЛОГО.png"
            alt="New Generation School"
            h={{ base: "8", sm: "10" }}
            w="auto"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))"
          />
          <Box display={{ base: "none", sm: "block" }}>
            <Text
              color="white"
              fontWeight="bold"
              fontSize={{ base: "sm", md: "md" }}
              letterSpacing="tight"
              lineHeight="1.2"
            >
              New Generation School
            </Text>
            <Text
              fontSize="10px"
              textTransform="uppercase"
              letterSpacing="widest"
              color="#FFB800"
              fontWeight="bold"
            >
              Fergana Campus
            </Text>
          </Box>
        </Flex>

        {/* Skip Button */}
        <Button
          onClick={handleFinish}
          size={{ base: "sm", md: "md" }}
          bg="rgba(255, 255, 255, 0.2)"
          backdropFilter="blur(16px)"
          color="white"
          border="1px solid rgba(255, 255, 255, 0.35)"
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

      {/* Bottom Bar: Sound Toggle & Status */}
      <Flex
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        p={{ base: 4, sm: 6, md: 8 }}
        justify="space-between"
        align="center"
        bgGradient="linear(to-t, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)"
        zIndex={10}
      >
        <Button
          onClick={toggleSound}
          size="sm"
          variant="ghost"
          color="white"
          bg="rgba(0, 0, 0, 0.4)"
          backdropFilter="blur(12px)"
          border="1px solid rgba(255, 255, 255, 0.25)"
          rounded="full"
          px={4}
          py={2}
          fontSize="xs"
          fontWeight="600"
          cursor="pointer"
          display="inline-flex"
          alignItems="center"
          gap={2}
          transition="all 0.2s"
          _hover={{
            bg: "rgba(255, 255, 255, 0.2)",
            borderColor: "white",
          }}
        >
          <Box as="span" className="material-symbols-outlined" fontSize="18px" color="#FFB800">
            {isMuted ? "volume_off" : "volume_up"}
          </Box>
          <span>{isMuted ? "Включить звук" : "Выключить звук"}</span>
        </Button>

        <Text
          color="rgba(255, 255, 255, 0.7)"
          fontSize={{ base: "2xs", sm: "xs" }}
          fontWeight="500"
          letterSpacing="wide"
        >
          Презентация кампуса NGS
        </Text>
      </Flex>

      {/* Bottom Progress Bar */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        h="3px"
        bg="#FFB800"
        w={`${progress}%`}
        transition="width 0.15s linear"
        zIndex={20}
      />
    </Box>
  );
}
