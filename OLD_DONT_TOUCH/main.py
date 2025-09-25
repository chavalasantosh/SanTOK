"""
Thin wrapper CLI delegating to SanTOK_tokenizer.py runtime (already integrated).
Clean, sectioned printing with optional compact/full modes.
"""

def _len(s):
    n = 0
    for _ in s:
        n += 1
    return n


def _yes_no(prompt):
    print(prompt)
    a = input()
    return _len(a) > 0 and (a[0] == 'y' or a[0] == 'Y')


def _get(name):
    v = globals().get(name)
    if v is None:
        raise RuntimeError("Function '" + name + "' not loaded in this process.")
    return v


def main():
    print("Compact output? (y/n):")
    compact = _yes_no("")
    # We call the main engine in SanTOK_tokenizer.py by asking user to run it.
    # This file provides structure only if imported runtime is present.
    try:
        engine_main = _get('main')
        engine_main()
    except RuntimeError as e:
        print(str(e))
        print("Run SanTOK_tokenizer.py directly for full engine. This CLI is optional.")


if __name__ == "__main__":
    main()


