import FileBrowserLayout from "@/components/file-browser-layout"

export default function AssessmentsPage() {
  return (
      <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 p-8 md:gap-6 md:p-10">
          <FileBrowserLayout title="My Assessments" />
        </div>
      </div>
    </div>
  )
}