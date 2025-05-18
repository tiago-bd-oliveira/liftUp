import json


def main():

    muscle_set = set()

    with open("data/exercises.json", "r") as f:
        data = json.load(f)

    for exercise in data:
        muscle_set.add(*exercise["primaryMuscles"])

    print(f"{muscle_set = }")


if __name__ == "__main__":
    main()
