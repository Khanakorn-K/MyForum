// "use client";

// import React from "react";
// import { Input } from "@/components/ui/Input";
// import { Search } from "lucide-react";

// interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     onSearch?: (value: string) => void;
// }

// export const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
//     ({ className, onSearch, onChange, ...props }, ref) => {
//         const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//             if (onChange) {
//                 onChange(e);
//             }
//             if (onSearch) {
//                 onSearch(e.target.value);
//             }
//         };

//         return (
//             <div className="relative w-full max-w-sm">
//                 <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//                 <Input
//                     placeholder="ค้นหาโพสต์ที่ต้องการ"
//                     ref={ref}
//                     type="search"
//                     className={`pl-9 ${className || ""}`}
//                     onChange={handleChange}
//                     {...props}
//                 />
//             </div>
//         );
//     }
// );
// export default SearchBar;