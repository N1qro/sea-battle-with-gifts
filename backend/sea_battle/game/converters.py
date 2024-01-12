from hashids import Hashids

def hashid_converter_factory(min_length=8, alphabet=Hashids.ALPHABET):

    class HashIdConverter:
        regex = r'[{}]{{}}'.format(min_length, alphabet)

        def to_python(self, value):
            return value

        def to_url(self, value):
            return value.hashid

    return HashIdConverter