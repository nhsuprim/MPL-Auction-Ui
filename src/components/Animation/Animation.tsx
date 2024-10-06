import { useEffect, useRef } from "react";

interface ConfettiDivElement extends HTMLDivElement {
    removeTimeout?: number; // Add custom property here
}

class Confettiful {
    el: HTMLElement;
    containerEl: HTMLElement | null;
    confettiFrequency: number;
    confettiColors: string[];
    confettiAnimations: string[];
    confettiInterval: number | undefined;

    constructor(el: HTMLElement) {
        this.el = el;
        this.containerEl = null;

        this.confettiFrequency = 3;
        this.confettiColors = [
            "#EF2964",
            "#00C09D",
            "#2D87B0",
            "#48485E",
            "#EFFF1D",
        ];
        this.confettiAnimations = ["slow", "medium", "fast"];

        this._setupElements();
        this._renderConfetti();
    }

    _setupElements() {
        const containerEl = document.createElement("div");
        const elPosition = window.getComputedStyle(this.el).position;

        if (elPosition !== "relative" && elPosition !== "absolute") {
            this.el.style.position = "relative";
        }

        containerEl.classList.add("confetti-container");
        this.el.appendChild(containerEl);

        this.containerEl = containerEl;
    }

    _renderConfetti() {
        this.confettiInterval = window.setInterval(() => {
            if (!this.containerEl) return;

            const confettiEl = document.createElement(
                "div"
            ) as ConfettiDivElement; // Cast to the extended type
            const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
            const confettiBackground =
                this.confettiColors[
                    Math.floor(Math.random() * this.confettiColors.length)
                ];
            const confettiLeft =
                Math.floor(Math.random() * this.el.offsetWidth) + "px";
            const confettiAnimation =
                this.confettiAnimations[
                    Math.floor(Math.random() * this.confettiAnimations.length)
                ];

            confettiEl.classList.add(
                "confetti",
                `confetti--animation-${confettiAnimation}`
            );
            confettiEl.style.left = confettiLeft;
            confettiEl.style.width = confettiSize;
            confettiEl.style.height = confettiSize;
            confettiEl.style.backgroundColor = confettiBackground;

            confettiEl.removeTimeout = window.setTimeout(() => {
                confettiEl.parentNode?.removeChild(confettiEl);
            }, 3000);

            this.containerEl.appendChild(confettiEl);
        }, 25);
    }

    destroy() {
        clearInterval(this.confettiInterval);
    }
}

const Confetti = () => {
    const confettiContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let confettiful: Confettiful | undefined;

        if (confettiContainerRef.current) {
            confettiful = new Confettiful(confettiContainerRef.current);
        }

        // Cleanup function to clear interval on unmount
        return () => {
            confettiful?.destroy();
        };
    }, []);

    return (
        <div
            ref={confettiContainerRef}
            className="js-container"
            style={{ position: "relative", width: "100%", height: "100%" }}
        ></div>
    );
};

export default Confetti;
