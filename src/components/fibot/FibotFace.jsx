import React, { useId } from 'react';

/**
 * Pure Vector CSS/SVG Fibot Face.
 * Accurately recreates Fibot's body, gradients, and eye geometry from design assets
 * with ultra-smooth CSS-driven eyes transitions, blinks, and interactive movement.
 *
 * @param {Object} props
 * @param {number} [props.size=62] - Width & height of the face in px
 * @param {number} [props.eyeX=0] - Horizontal eye offset (-40 to +40)
 * @param {number} [props.eyeY=0] - Vertical eye offset (-60 to +60)
 * @param {'default' | 'see-up' | 'see-down' | 'see-center' | 'thinking' | 'idle'} [props.state='default']
 * @param {boolean} [props.isBlinking=false] - Trigger blink animation
 * @param {boolean} [props.isThinking=false] - Trigger thinking squint animation
 * @param {number} [props.squintLeft=1] - Extra height scale multiplier for the left eye
 * @param {number} [props.squintRight=1] - Extra height scale multiplier for the right eye
 * @param {string} [props.className='']
 */
export default function FibotFace({
  size = 62,
  eyeX = 0,
  eyeY = 0,
  state = 'default',
  isBlinking = false,
  isThinking = false,
  squintLeft = 1,
  squintRight = 1,
  className = '',
}) {
  const uniqueId = useId().replace(/:/g, '_');

  // Compute base eye positioning based on semantic state
  let baseOffsetX = eyeX;
  let baseOffsetY = eyeY;
  let scaleY = 1;
  let leftEyeScale = 1;
  let rightEyeScale = 1;

  if (state === 'see-up') {
    baseOffsetY = eyeY - 80;
    baseOffsetX = eyeX - 48;
  } else if (state === 'see-down') {
    baseOffsetY = eyeY + 60;
    baseOffsetX = eyeX - 48;
  } else if (state === 'see-center') {
    baseOffsetX = eyeX - 48;
    baseOffsetY = eyeY + 2;
  } else if (state === 'default') {
    baseOffsetX = eyeX;
    baseOffsetY = eyeY - 40;
  }

  // Optional per-eye height squint (idle personality / asymmetric eye heights)
  leftEyeScale *= squintLeft;
  rightEyeScale *= squintRight;

  return (
    <div
      className={`fibot-face-container ${isBlinking ? 'is-blinking' : ''} ${
        isThinking ? 'is-thinking' : ''
      } ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 683 683"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fibot-face-svg"
      >
        <defs>
          {/* Outer Body Drop Shadow Filter */}
          <filter
            id={`fibot_shadow_${uniqueId}`}
            x="0"
            y="0"
            width="683"
            height="683"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>

          {/* Body Linear Gradient (Deep Black to Matte Charcoal) */}
          <linearGradient
            id={`fibot_body_gradient_${uniqueId}`}
            x1="341.5"
            y1="6"
            x2="341.5"
            y2="673"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0B0B10" />
            <stop offset="1" stopColor="#222228" />
          </linearGradient>

          {/* Left Eye Vertical Silver-White Linear Gradient */}
          <linearGradient
            id={`fibot_eye_gradient_left_${uniqueId}`}
            x1="217"
            y1="158"
            x2="217"
            y2="434.32"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#D4D4D8" />
          </linearGradient>

          {/* Right Eye Vertical Silver-White Linear Gradient */}
          <linearGradient
            id={`fibot_eye_gradient_right_${uniqueId}`}
            x1="466"
            y1="159.68"
            x2="466"
            y2="436"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#D4D4D8" />
          </linearGradient>
        </defs>

        {/* Group with Drop Shadow */}
        <g filter={`url(#fibot_shadow_${uniqueId})`}>
          {/* Main Body */}
          <rect
            x="8"
            y="6"
            width="667"
            height="667"
            rx="333.5"
            fill={`url(#fibot_body_gradient_${uniqueId})`}
            className="fibot-body-rect"
          />

          {/* Inner Rim Light / Subtle Bevel Stroke */}
          <rect
            x="9"
            y="7"
            width="665"
            height="665"
            rx="332.5"
            stroke="rgba(255, 255, 255, 0.14)"
            strokeWidth="2.5"
            fill="none"
          />

          {/* Eyes Group with Smooth CSS Transform & Transitions */}
          <g
            className="fibot-eyes-rig"
            style={{
              transform: `translate(${baseOffsetX}px, ${baseOffsetY}px)`,
            }}
          >
            {/* Left Eye Ellipse */}
            <ellipse
              cx="217"
              cy="338"
              rx="96"
              ry={138.16 * leftEyeScale}
              fill={`url(#fibot_eye_gradient_left_${uniqueId})`}
              className="fibot-eye-shape fibot-eye-left"
            />

            {/* Right Eye Ellipse */}
            <ellipse
              cx="466"
              cy="339.68"
              rx="96"
              ry={138.16 * rightEyeScale}
              fill={`url(#fibot_eye_gradient_right_${uniqueId})`}
              className="fibot-eye-shape fibot-eye-right"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}