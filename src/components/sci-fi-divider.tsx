"use client";

export function SciFiDivider() {
    return (
        <div className="absolute -top-px left-0 right-0 h-4 overflow-hidden">
            <div className="container relative flex items-center justify-center h-full px-4 md:px-6">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"></div>
            </div>
        </div>
    );
}
