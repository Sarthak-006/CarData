"use client"

type CarIconProps = {
    size?: number;
    className?: string;
}

// Lightning McQueen icon
export function LightningIcon({ size = 20, className = "" }: CarIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22 15.5C22 17.985 19.978 20 17.5 20C15.022 20 13 17.985 13 15.5C13 13.015 15.022 11 17.5 11C19.978 11 22 13.015 22 15.5Z"
                fill="#E53E3E"
            />
            <path
                d="M11 15.5C11 17.985 8.978 20 6.5 20C4.022 20 2 17.985 2 15.5C2 13.015 4.022 11 6.5 11C8.978 11 11 13.015 11 15.5Z"
                fill="#E53E3E"
            />
            <path
                d="M21 10H3C2.448 10 2 10.448 2 11V13C2 13.552 2.448 14 3 14H21C21.552 14 22 13.552 22 13V11C22 10.448 21.552 10 21 10Z"
                fill="#E53E3E"
            />
            <path
                d="M19 4.5H5C4.172 4.5 3.5 5.172 3.5 6V10H20.5V6C20.5 5.172 19.828 4.5 19 4.5Z"
                fill="#E53E3E"
            />
            <path
                d="M5 6L6 8L9 9H15L18 8L19 6"
                fill="#FFCC00"
            />
            <path
                d="M12 8.5L13.5 7H15.5L16.5 8.5H12Z"
                fill="#FFFFFF"
            />
            <path
                d="M7.5 8.5L8.5 7H10.5L11.5 8.5H7.5Z"
                fill="#FFFFFF"
            />
            <path
                d="M17.5 12C16.12 12 15 13.12 15 14.5C15 15.88 16.12 17 17.5 17C18.88 17 20 15.88 20 14.5C20 13.12 18.88 12 17.5 12ZM17.5 16C16.673 16 16 15.327 16 14.5C16 13.673 16.673 13 17.5 13C18.327 13 19 13.673 19 14.5C19 15.327 18.327 16 17.5 16Z"
                fill="#333333"
            />
            <path
                d="M6.5 12C5.12 12 4 13.12 4 14.5C4 15.88 5.12 17 6.5 17C7.88 17 9 15.88 9 14.5C9 13.12 7.88 12 6.5 12ZM6.5 16C5.673 16 5 15.327 5 14.5C5 13.673 5.673 13 6.5 13C7.327 13 8 13.673 8 14.5C8 15.327 7.327 16 6.5 16Z"
                fill="#333333"
            />
            <path d="M13 9H14L14.2 9.8L13.5 10.2L13 9Z" fill="#FFCC00" />
            <path d="M10 9H11L10.5 10.2L9.8 9.8L10 9Z" fill="#FFCC00" />
        </svg>
    )
}

// Fillmore icon (VW Bus)
export function FillmoreIcon({ size = 20, className = "" }: CarIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 14.5C21 16.433 19.433 18 17.5 18C15.567 18 14 16.433 14 14.5C14 12.567 15.567 11 17.5 11C19.433 11 21 12.567 21 14.5Z"
                fill="#2F855A"
            />
            <path
                d="M10 14.5C10 16.433 8.433 18 6.5 18C4.567 18 3 16.433 3 14.5C3 12.567 4.567 11 6.5 11C8.433 11 10 12.567 10 14.5Z"
                fill="#2F855A"
            />
            <path
                d="M20 10H4C3.448 10 3 10.448 3 11V14C3 14.552 3.448 15 4 15H20C20.552 15 21 14.552 21 14V11C21 10.448 20.552 10 20 10Z"
                fill="#2F855A"
            />
            <path
                d="M18 5H6C5.448 5 5 5.448 5 6V10H19V6C19 5.448 18.552 5 18 5Z"
                fill="#2F855A"
            />
            <rect x="6" y="6" width="2" height="3" rx="0.5" fill="#CBD5E0" />
            <rect x="9" y="6" width="2" height="3" rx="0.5" fill="#CBD5E0" />
            <rect x="12" y="6" width="2" height="3" rx="0.5" fill="#CBD5E0" />
            <rect x="15" y="6" width="2" height="3" rx="0.5" fill="#CBD5E0" />
            <path
                d="M17.5 12C16.673 12 16 12.673 16 13.5C16 14.327 16.673 15 17.5 15C18.327 15 19 14.327 19 13.5C19 12.673 18.327 12 17.5 12Z"
                fill="#333333"
            />
            <path
                d="M6.5 12C5.673 12 5 12.673 5 13.5C5 14.327 5.673 15 6.5 15C7.327 15 8 14.327 8 13.5C8 12.673 7.327 12 6.5 12Z"
                fill="#333333"
            />
            <path d="M10 11H14V12C14 12.552 13.552 13 13 13H11C10.448 13 10 12.552 10 12V11Z" fill="#A0AEC0" />
            <path
                d="M7 7.5C7 7.776 6.776 8 6.5 8C6.224 8 6 7.776 6 7.5C6 7.224 6.224 7 6.5 7C6.776 7 7 7.224 7 7.5Z"
                fill="#4A5568"
                stroke="#4A5568"
                strokeWidth="0.2"
            />
            <path
                d="M10 7.5C10 7.776 9.776 8 9.5 8C9.224 8 9 7.776 9 7.5C9 7.224 9.224 7 9.5 7C9.776 7 10 7.224 10 7.5Z"
                fill="#4A5568"
                stroke="#4A5568"
                strokeWidth="0.2"
            />
            <path
                d="M13 7.5C13 7.776 12.776 8 12.5 8C12.224 8 12 7.776 12 7.5C12 7.224 12.224 7 12.5 7C12.776 7 13 7.224 13 7.5Z"
                fill="#4A5568"
                stroke="#4A5568"
                strokeWidth="0.2"
            />
            <path
                d="M16 7.5C16 7.776 15.776 8 15.5 8C15.224 8 15 7.776 15 7.5C15 7.224 15.224 7 15.5 7C15.776 7 16 7.224 16 7.5Z"
                fill="#4A5568"
                stroke="#4A5568"
                strokeWidth="0.2"
            />
        </svg>
    )
}

// Doc Hudson icon
export function DocHudsonIcon({ size = 20, className = "" }: CarIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22 16C22 18.209 20.209 20 18 20C15.791 20 14 18.209 14 16C14 13.791 15.791 12 18 12C20.209 12 22 13.791 22 16Z"
                fill="#2B6CB0"
            />
            <path
                d="M10 16C10 18.209 8.209 20 6 20C3.791 20 2 18.209 2 16C2 13.791 3.791 12 6 12C8.209 12 10 13.791 10 16Z"
                fill="#2B6CB0"
            />
            <path
                d="M20 11H4C3.448 11 3 11.448 3 12V15C3 15.552 3.448 16 4 16H20C20.552 16 21 15.552 21 15V12C21 11.448 20.552 11 20 11Z"
                fill="#2B6CB0"
            />
            <path
                d="M19 5H5C4.448 5 4 5.448 4 6V11H20V6C20 5.448 19.552 5 19 5Z"
                fill="#2B6CB0"
            />
            <path
                d="M5 6L6 8L9 10H15L18 10L19 8V6H5Z"
                fill="#A0AEC0"
            />
            <path
                d="M18 13C16.895 13 16 13.895 16 15C16 16.105 16.895 17 18 17C19.105 17 20 16.105 20 15C20 13.895 19.105 13 18 13ZM18 16C17.448 16 17 15.552 17 15C17 14.448 17.448 14 18 14C18.552 14 19 14.448 19 15C19 15.552 18.552 16 18 16Z"
                fill="#333333"
            />
            <path
                d="M6 13C4.895 13 4 13.895 4 15C4 16.105 4.895 17 6 17C7.105 17 8 16.105 8 15C8 13.895 7.105 13 6 13ZM6 16C5.448 16 5 15.552 5 15C5 14.448 5.448 14 6 14C6.552 14 7 14.448 7 15C7 15.552 6.552 16 6 16Z"
                fill="#333333"
            />
            <path d="M12 7H15L16 8H12V7Z" fill="#E2E8F0" />
            <path d="M8 7H11V8H8L9 7Z" fill="#E2E8F0" />
            <path
                d="M11 9H13C13.552 9 14 9.448 14 10H10C10 9.448 10.448 9 11 9Z"
                fill="#4A5568"
            />
            <path d="M19 6.5L18 9L17 9.5L19 6.5Z" fill="#2B6CB0" />
            <path d="M5 6.5L6 9L7 9.5L5 6.5Z" fill="#2B6CB0" />
        </svg>
    )
}

// Mater icon
export function MaterIcon({ size = 20, className = "" }: CarIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M21 15.5C21 17.433 19.433 19 17.5 19C15.567 19 14 17.433 14 15.5C14 13.567 15.567 12 17.5 12C19.433 12 21 13.567 21 15.5Z"
                fill="#A0522D"
            />
            <path
                d="M10 15.5C10 17.433 8.433 19 6.5 19C4.567 19 3 17.433 3 15.5C3 13.567 4.567 12 6.5 12C8.433 12 10 13.567 10 15.5Z"
                fill="#A0522D"
            />
            <path
                d="M19 12H5C4.448 12 4 12.448 4 13V15C4 15.552 4.448 16 5 16H19C19.552 16 20 15.552 20 15V13C20 12.448 19.552 12 19 12Z"
                fill="#A0522D"
            />
            <path
                d="M18 7H6C5.448 7 5 7.448 5 8V12H19V8C19 7.448 18.552 7 18 7Z"
                fill="#A0522D"
            />
            <path
                d="M11 8H13V9.5C13 9.776 12.776 10 12.5 10H11.5C11.224 10 11 9.776 11 9.5V8Z"
                fill="#8B4513"
            />
            <path
                d="M15 8H17V9.5C17 9.776 16.776 10 16.5 10H15.5C15.224 10 15 9.776 15 9.5V8Z"
                fill="#8B4513"
            />
            <path
                d="M7 8H9V9.5C9 9.776 8.776 10 8.5 10H7.5C7.224 10 7 9.776 7 9.5V8Z"
                fill="#8B4513"
            />
            <path
                d="M17.5 13C16.672 13 16 13.672 16 14.5C16 15.328 16.672 16 17.5 16C18.328 16 19 15.328 19 14.5C19 13.672 18.328 13 17.5 13Z"
                fill="#333333"
            />
            <path
                d="M6.5 13C5.672 13 5 13.672 5 14.5C5 15.328 5.672 16 6.5 16C7.328 16 8 15.328 8 14.5C8 13.672 7.328 13 6.5 13Z"
                fill="#333333"
            />
            <path
                d="M19 8L20 9.5V12H19V8Z"
                fill="#8B4513"
            />
            <path d="M8 11C8 11.552 8.448 12 9 12H10C10.552 12 11 11.552 11 11C11 10.448 10.552 10 10 10H9C8.448 10 8 10.448 8 11Z" fill="#8B4513" />
            <path d="M13 11C13 11.552 13.448 12 14 12H15C15.552 12 16 11.552 16 11C16 10.448 15.552 10 15 10H14C13.448 10 13 10.448 13 11Z" fill="#8B4513" />
            <path d="M7.5 8.5C7.5 8.776 7.276 9 7 9C6.724 9 6.5 8.776 6.5 8.5C6.5 8.224 6.724 8 7 8C7.276 8 7.5 8.224 7.5 8.5Z" fill="#654321" />
            <path d="M9.5 8.5C9.5 8.776 9.276 9 9 9C8.724 9 8.5 8.776 8.5 8.5C8.5 8.224 8.724 8 9 8C9.276 8 9.5 8.224 9.5 8.5Z" fill="#654321" />
            <path d="M11.5 8.5C11.5 8.776 11.276 9 11 9C10.724 9 10.5 8.776 10.5 8.5C10.5 8.224 10.724 8 11 8C11.276 8 11.5 8.224 11.5 8.5Z" fill="#654321" />
            <path d="M13.5 8.5C13.5 8.776 13.276 9 13 9C12.724 9 12.5 8.776 12.5 8.5C12.5 8.224 12.724 8 13 8C13.276 8 13.5 8.224 13.5 8.5Z" fill="#654321" />
            <path d="M15.5 8.5C15.5 8.776 15.276 9 15 9C14.724 9 14.5 8.776 14.5 8.5C14.5 8.224 14.724 8 15 8C15.276 8 15.5 8.224 15.5 8.5Z" fill="#654321" />
            <path d="M17.5 8.5C17.5 8.776 17.276 9 17 9C16.724 9 16.5 8.776 16.5 8.5C16.5 8.224 16.724 8 17 8C17.276 8 17.5 8.224 17.5 8.5Z" fill="#654321" />
            <path d="M20 10.5L22 11V15L20 16V10.5Z" fill="#A52A2A" stroke="#8B4513" strokeWidth="0.3" />
        </svg>
    )
}

// Function to generate a Cars character icon based on the name
export function getCarsIcon(name: string, size: number = 20, className: string = "") {
    switch (name.toLowerCase()) {
        case 'lightning':
        case 'mcqueen':
        case 'lightning mcqueen':
            return <LightningIcon size={size} className={className} />;
        case 'fillmore':
            return <FillmoreIcon size={size} className={className} />;
        case 'doc':
        case 'hudson':
        case 'doc hudson':
            return <DocHudsonIcon size={size} className={className} />;
        case 'mater':
            return <MaterIcon size={size} className={className} />;
        default:
            return <LightningIcon size={size} className={className} />;
    }
} 