import json


def main():

    with open("data/exercises.json", "r") as f:
        data = json.load(f)

    for i, exercise in enumerate(data):
        for j, img in enumerate(exercise["images"]):
            data[i]["images"][j] = (
                "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/"
                + img
            )

    with open("data/exercises_updated.json", "w") as f:
        json.dump(data, f)


if __name__ == "__main__":
    main()
