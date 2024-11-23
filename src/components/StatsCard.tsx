import { StatsCardInterface } from "@/Interfaces/UiInterfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCard({ 
    title, 
    value, 
    helperText, 
    className, 
    loading, 
    icon 
  } : StatsCardInterface) {
    return (
      <div className={`relative p-1 rounded-lg ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-lg blur-sm opacity-75 animate-border" />
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <Card>
            <CardHeader className='flex flex-row items-center gap-2 justify-center pb-2'>
              <CardTitle className='text-sm tracking-wider font-medium text-muted-foreground'>
                {title}
              </CardTitle>
              {icon}
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {
                  loading && 
                  (<Skeleton>
                    <span className='opacity-0'>0</span>
                  </Skeleton>)
                }
                {!loading && value}
              </div>
              <p className='text-xs text-muted-foreground pt-1'>{helperText}</p>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
