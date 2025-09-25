import React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"
import { FilterType } from "../lib/data" // giả sử là { all: 'Tất cả', active: 'Đang làm', completed: 'Hoàn thành' }

const StatsAndFilters = ({
  completedTasksCount,
  activeTasksCount,
  filter = "all",
  setFilter
}) => {
  return (

    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      { }
      <div className="flex gap-3">
        <Badge
          variant="secondary"
          className="bg-white/50 text-accent-foreground border-info/20">
          {activeTasksCount} {FilterType.active}
        </Badge>


        <Badge
          variant="secondary"
          className="bg-white/50 text-success border-success/20">
          {completedTasksCount} {FilterType.completed}
        </Badge>
      </div>

      {/* filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {Object.keys(FilterType).map((type) => (
          <Button
            key={type}
            variant={filter === type ? "gradient" : "ghost"} // đổi "gradient" nếu bạn đã custom
            size="sm"
            className="capitalize"
            onClick={() => setFilter(type)}
          >
            <Filter className="size-4 " />
            {FilterType[type]}
          </Button>
        ))}
      </div>

    </div>
  );
};

export default StatsAndFilters
