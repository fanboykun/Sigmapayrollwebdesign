/**
 * ==========================================================================
 * DATE PICKER COMPONENT
 * ==========================================================================
 * 
 * Komponen date picker yang enhanced dengan fitur:
 * - Input manual dengan format DD/MM/YYYY
 * - Year picker untuk navigasi tahun cepat
 * - Layout kalender yang konsisten
 * - Validasi input tanggal
 * 
 * @version 1.0.0
 * @since 2024-10-28
 * ==========================================================================
 */

import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { DayPicker } from "react-day-picker@8.10.1";
import { buttonVariants } from "./button";

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pilih tanggal",
  className,
  disabled = false,
  fromYear = 1950,
  toYear = new Date().getFullYear() + 10,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [month, setMonth] = React.useState<Date>(date || new Date());

  // Update input value when date changes
  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "dd/MM/yyyy"));
      setMonth(date);
    } else {
      setInputValue("");
    }
  }, [date]);

  // Handle manual input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Try to parse the input
    if (value.length === 10) {
      const parsedDate = parse(value, "dd/MM/yyyy", new Date());
      if (isValid(parsedDate)) {
        onDateChange?.(parsedDate);
        setMonth(parsedDate);
      }
    } else if (value === "") {
      onDateChange?.(undefined);
    }
  };

  // Handle input blur - validate and format
  const handleInputBlur = () => {
    if (inputValue && inputValue.length === 10) {
      const parsedDate = parse(inputValue, "dd/MM/yyyy", new Date());
      if (isValid(parsedDate)) {
        setInputValue(format(parsedDate, "dd/MM/yyyy"));
      } else {
        // Reset to current date if invalid
        if (date) {
          setInputValue(format(date, "dd/MM/yyyy"));
        } else {
          setInputValue("");
        }
      }
    }
  };

  // Handle date selection from calendar
  const handleSelect = (selectedDate: Date | undefined) => {
    onDateChange?.(selectedDate);
    if (selectedDate) {
      setInputValue(format(selectedDate, "dd/MM/yyyy"));
      setMonth(selectedDate);
    }
    setOpen(false);
  };

  // Generate year options
  const years = React.useMemo(() => {
    const yearArray: number[] = [];
    for (let i = toYear; i >= fromYear; i--) {
      yearArray.push(i);
    }
    return yearArray;
  }, [fromYear, toYear]);

  // Generate month options
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  return (
    <div className={cn("flex gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="DD/MM/YYYY"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={disabled}
            className="flex-1"
            maxLength={10}
          />
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "px-3",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b flex items-center justify-between gap-2">
            <Select
              value={months[month.getMonth()]}
              onValueChange={(value) => {
                const newMonth = new Date(month);
                newMonth.setMonth(months.indexOf(value));
                setMonth(newMonth);
              }}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {months.map((monthName) => (
                  <SelectItem key={monthName} value={monthName}>
                    {monthName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={month.getFullYear().toString()}
              onValueChange={(value) => {
                const newMonth = new Date(month);
                newMonth.setFullYear(parseInt(value));
                setMonth(newMonth);
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[200px]">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={handleSelect}
            month={month}
            onMonthChange={setMonth}
            locale={id}
            showOutsideDays={true}
            fixedWeeks
            className="p-3"
            classNames={{
              months: "flex flex-col sm:flex-row gap-2",
              month: "flex flex-col gap-4",
              caption: "flex justify-center pt-1 relative items-center w-full",
              caption_label: "hidden",
              nav: "flex items-center gap-1",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: cn(
                "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                "[&:has([aria-selected])]:bg-accent [&:has([aria-selected])]:rounded-md"
              ),
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "size-9 p-0 font-normal aria-selected:opacity-100",
              ),
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside:
                "day-outside text-muted-foreground opacity-50 aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_hidden: "invisible",
            }}
            components={{
              IconLeft: ({ className, ...props }) => (
                <ChevronLeft className={cn("size-4", className)} {...props} />
              ),
              IconRight: ({ className, ...props }) => (
                <ChevronRight className={cn("size-4", className)} {...props} />
              ),
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
