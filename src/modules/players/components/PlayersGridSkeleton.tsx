export function PlayersGridSkeleton() {

  return (
    <div
      className="
        grid
        gap-5

        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <div
          key={index}
          className="
            rounded-2xl
            border
            p-5
            animate-pulse
            space-y-5
          "
        >
          <div className="flex gap-4">

            <div
              className="
                size-14
                rounded-full
                bg-muted
              "
            />

            <div className="flex-1 space-y-2">

              <div
                className="
                  h-4
                  w-32
                  rounded
                  bg-muted
                "
              />

              <div
                className="
                  h-3
                  w-44
                  rounded
                  bg-muted
                "
              />

              <div className="flex gap-2 pt-2">

                <div
                  className="
                    h-6
                    w-20
                    rounded-full
                    bg-muted
                  "
                />

                <div
                  className="
                    h-6
                    w-16
                    rounded-full
                    bg-muted
                  "
                />
              </div>
            </div>
          </div>

          <div
            className="
              border-t
              pt-4
            "
          >
            <div
              className="
                h-4
                w-24
                rounded
                bg-muted
              "
            />
          </div>
        </div>
      ))}
    </div>
  )
}